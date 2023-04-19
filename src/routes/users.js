const express= require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const {check,validationResult, body} = require('express-validator');    
/* Variable creada por sequelize para conectar la base de datos */
const db  = require("../database/models/");

/* Asocia el modelo "User" de la base de datos "db" */
const User = db.User;
/* Requiero Multer para permitir leer el archivo de el avatar del usuario una vez que se registre */
const multer = require('multer');
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        /* Aquí se indica donde se van a guardar las imagenes del usuario */
        cb(null, "./public/img/avatars")
    },
    filename: function(req, file, cb){
        cb(null, file.filename + "-" + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage });

/* Nuevo controlador */
const usersController = require(path.resolve(__dirname, '../controllers/userControllerNuevo'));

//Middlewares
const guestMiddleware = require('../middlewares/routes/guestMiddleware');
/* const authMiddleware = require('../middlewares/routes/authMiddleware'); */

/* ------------------- Listado de rutas de users --------------------*/

/* Ruta para mostrar el listado de usuarios registrados */
router.get('/list', usersController.list);

/* Ruta de detalle de usuario */
router.get('/list/:id', usersController.detailUser);

/* Ruta que se encarga de mostrar el formulario para crear un nuevo registro de usuario */
router.get('/register', usersController.add);

/* Ruta que se encarga de mostrar el formulario, validar cada dato desde la db y crear un nuevo registro de usuario */
User.findAll()
.then((users) => {
    router.post('/register/',  upload.single('avatar'),[
        /* Validaciones para realizar el registro */
        check('firstName').isLength({ min: 1 }).withMessage('El campo nombre no puede estar vacío'),
        check('lastName').isLength({ min: 1 }).withMessage('El campo apellido no puede estar vacío'),
        check('nameUser').isLength({ min: 1 }).withMessage('El campo nombre de usuario no puede estar vacío'),
        check('email').isEmail().withMessage('Agregar un email válido'),
        /* Aquí valido si el usuario ya se encuentra registrado con ese email */
        body('email').custom(function(value) {
            let contador = 0;
            for(let i = 0; i < users.length; i++) {
                if(users[i].email == value) {
                    contador++;
                }
            }
            if(contador > 0) {
                /* Si retorno falso no aparece el mensaje de error */
                return false;
            } else {
                /* Si retorno true, aparece el mensaje de error */
                return true;
            }
        }).withMessage('El email ya se encuentra registrado'),

        /* Validación de contraseña y confirmación de contraseña*/
        check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener un mínimo de 6 caracteres, al menos una letra y un número'),
        /* check('confirm_password').isLength({ min: 6 }).withMessage('La confirmación de la contraseña debe tener un mínimo de 6 caracteres'), */
        /* Aquí valido que ambas contraseñas sean iguales. El value viene a ser el valor del name"" en el InputDeviceInfo. El valor {req} corresponde a lo que viene desde el formulario. */
        body('passwordConfirmed').custom((value, { req }) => {
            if (req.body.password == value) {
              /* Si retorno falso no aparece el mensaje de error */
              return true;
            } else {
              /* Si retorno true, aparece el mensaje de error */
              return false;
            }
          }).withMessage('Las contraseñas deben ser iguales'),
          /* Validación de extensiones de los archivos de los avatar */
          /* Con el método body obtengo el valor del campo de 'avatar'| Se utiliza el método "custom" para definir una función de validación personalizada que toma dos parámetros: el valor del campo "avatar" y el objeto de solicitud HTTP "req" */
          body('avatar').custom(function (value, { req }) {
            if (!req.file) {
              return true;
            }
            let extension = "" + path.extname(req.file.filename).toLowerCase();
            if (
                extension == '.jpg' || 
                extension == '.jpeg' || 
                extension == '.png' || 
                extension == '.gif') {
              return true;
            }
            return false;
          }).withMessage('Solo debe seleccionar archivos con extensión JPG, JPEG, PNG o GIF')
    ], usersController.create);
})

/* Ruta que se encarga de mostrar el formulario para modificar un usuario ya registrado*/
router.get('/edit/:id/', usersController.edit);

/* Ruta que se encarga de modificar los datos de un usuario ya registrado*/
router.post('/edit/:id', usersController.update);

/* Ruta que se encarga de modificar los datos de un usuario ya registrado*/
router.post('/delete/:id', usersController.delete);

/* ---------------------RUTAS DE USERS-LOGIN ------------------------*/

/* Ruta que se encarga de mostrar el formulario de login */
router.get('/login', usersController.login);

/* Ruta que se encarga de validar los datos del usuario registrado e ingresar si son correctos */
router.post('/login', [
    check('email').isEmail().withMessage('Email invalido'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener un mínimo de 6 caracteres, al menos una letra y un número')], usersController.loginPost);

// Perfil del usuario
/* router.get('/profile', guestMiddleware, usersController.profile); */
router.get('/profile/:id', usersController.profile);

/* ---------------- Fin Listado de rutas -------------------*/
module.exports = router;
