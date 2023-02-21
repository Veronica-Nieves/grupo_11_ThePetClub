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
const validations = require ('../middlewares/global/validateMiddleware')

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
