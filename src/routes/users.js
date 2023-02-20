const express= require('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');

const { body } = require('express-validator');

const storage = multer.diskStorage({
    detination: (req, file, cb) => {
        cb(null, './public/img/avatars')
    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
        }
});

const uploadFile = multer({ storage });

const usersController = require('../controllers/usersController');

const validations = [
    body('firstName').notEmpty().withMessage('Debes escribir tu nombre'),
    body('lastName').notEmpty().withMessage('Debes escribir tu apellido'),
    body('nameUser').notEmpty().withMessage('Debes escribir tu nombre de usuario'),
    body('email')
      .notEmpty().withMessage('Debes escribir tu email').bail()
      .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('password').notEmpty().withMessage('Debes escribir tu contraseña'),
    body('passwordConfirmed').notEmpty().withMessage('Debes escribir tu confirmación de contraseña'),
    body('role').notEmpty().withMessage('Debes elegir un rol'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions =  ['.jpg', '.png', '.gif'];

        if (!file) {
            throw new Error('Tienes que subir una imagen')
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivos permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
    })
];

/* ------------------- Listado de rutas de users --------------------*/

/* Formulario de registro */
router.get('/register/', usersController.register);

/* Procesar el registro */
router.post('/register/', uploadFile.single('avatar'), validations, usersController.processRegister);


// ******  IMPORTANTE *****
/* Las rutas de login se encuentran en el router de productos y en el productController


/* Perfil del usuario */
router.get('/profile/:userId', usersController.profile);

/* ---------------- Fin Listado de rutas -------------------*/
module.exports = router;
