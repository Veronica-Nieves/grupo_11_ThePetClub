const express= require('express');
const router = express.Router();
const path = require('path');

//Controller
const usersController = require('../controllers/usersController');

const { body } = require('express-validator');

//Middlewares
const guestMiddleware = require('../middlewares/routes/guestMiddleware');
const authMiddleware = require('../middlewares/routes/authMiddleware');
const uploadFile = require ('../middlewares/global/multerMiddleware')

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

// Formulario de registro
router.get('/register/', usersController.register);

// Procesar el registro
router.post('/register/', uploadFile.single('avatar'), validations, usersController.processRegister);


/* ---------------------RUTAS DE USERS-LOGIN ------------------------*/

// Formulario de login
router.get('/login/', usersController.login);
router.post('/login/', uploadFile.single("image") , usersController.processLogin);

// Perfil del usuario
router.get('/profile/', guestMiddleware, usersController.profile);
router.get('/profile/:userId', usersController.profile);

/* ---------------- Fin Listado de rutas -------------------*/
module.exports = router;
