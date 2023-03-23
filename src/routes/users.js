const express= require('express');
const router = express.Router();
const path = require('path');

/* Controller */
/* const usersController = require('../controllers/usersController'); */

/* Nuevo controlador */
const usersController = require('../controllers/userControllerNuevo');
const { body } = require('express-validator');

//Middlewares
const guestMiddleware = require('../middlewares/routes/guestMiddleware');
const authMiddleware = require('../middlewares/routes/authMiddleware');
const uploadFile = require ('../middlewares/global/multerMiddleware')
const validations = require ('../middlewares/global/validateMiddleware')

/* ------------------- Listado de rutas de users --------------------*/

/* Ruta para mostrar el listado de usuarios registrados */
router.get('/list', usersController.list);

/* Ruta de detalle de usuario */
router.get('/list/:id', usersController.detailUser);

/* Ruta que se encarga de mostrar el formulario para crear un nuevo registro de usuario */
router.get('/register/', usersController.add);

/* Ruta que se encarga de mostrar el formulario y crear un nuevo registro de usuario */
router.post('/register/',/*  uploadFile.single('avatar'), validations, */ usersController.create/* , usersController.processRegister */);

/* Ruta que se encarga de mostrar el formulario para modificar un usuario ya registrado*/
router.get('/edit/:id', usersController.edit);

/* Ruta que se encarga de modificar los datos de un usuario ya registrado*/
router.post('/edit/:id', usersController.update);

/* Ruta que se encarga de modificar los datos de un usuario ya registrado*/
router.post('/delete/:id', usersController.delete);

/* ---------------------RUTAS DE USERS-LOGIN ------------------------*/

// Formulario de login
router.get('/login/'/* , usersController.login */);
//router.post('/login/'/* , uploadFile.single("image") , usersController.processLogin */);

// Perfil del usuario
//router.get('/profile/'/* , guestMiddleware, usersController.profile */);
//router.get('/profile/:userId'/* , usersController.profile */);

/* ---------------- Fin Listado de rutas -------------------*/
module.exports = router;
