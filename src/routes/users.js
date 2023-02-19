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
    body('name-user').notEmpty().withMessage('Debes escribir tu nombre de usuario'),
    body('email').notEmpty().withMessage('Debes escribir tu email'),
    body('password').notEmpty().withMessage('Debes escribir tu contraseña'),
    body('passwordConfirmed').notEmpty().withMessage('Debes escribir tu confirmación de contraseña'),
    body('administrator-user').notEmpty().withMessage('Debes elegir un rol'),
];

/* ------------------- Listado de rutas de users --------------------*/

/* Formulario de registro */
router.get('/register/', usersController.register);

/* Procesar el registro */
router.post('/register/', usersController.processRegister);

/* Formulario de login */
router.get('/login/', uploadFile.single('avatar'), validations, usersController.login);

/* Perfil del usuario */
router.get('/profile/:userId', usersController.profile);

/* ---------------- Fin Listado de rutas -------------------*/
module.exports = router;
