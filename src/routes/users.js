const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcryptjs");
const { body } = require("express-validator");

const db = require("../database/models/"); /* Variable creada por sequelize para conectar la base de datos */
const User = db.User; /* Asocia el modelo "User" de la base de datos "db" */

/* Requiero Multer para permitir leer el archivo de el avatar del usuario una vez que se registre */
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/img/avatars");
    } /* Donde se guardan las imagenes */,

    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    } /* Con que nombre se van a guardar las imagenes */,
});
const upload = multer({ storage });

/* Nuevo controlador */
const usersController = require("../controllers/userControllerNuevo");

//Middlewares
const guestMiddleware = require("../middlewares/routes/guestMiddleware");
/* const authMiddleware = require('../middlewares/routes/authMiddleware'); */

/* Validaciones desde la db */
const validateUser = [
    /* Validaciones para realizar el registro */
    body("firstName").isLength({ min: 1 }).withMessage("El campo nombre no puede estar vacío"),
    body("lastName").isLength({ min: 1 }).withMessage("El campo apellido no puede estar vacío"),
    body("nameUser").isLength({ min: 1 }).withMessage("El campo nombre de usuario no puede estar vacío"),

    // /* Validación de contraseña y confirmación de contraseña*/
    // body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener un mínimo de 6 caracteres, al menos una letra y un número'),
    // /* body('confirm_password').isLength({ min: 6 }).withMessage('La confirmación de la contraseña debe tener un mínimo de 6 caracteres'), */
    // /* Aquí valido que ambas contraseñas sean iguales. El value viene a ser el valor del name"" en el InputDeviceInfo. El valor {req} corresponde a lo que viene desde el formulario. */
    // body('passwordConfirmed').custom((value, { req }) => {
    //     if (req.body.password == value) {
    //       /* Si retorno falso no aparece el mensaje de error */
    //         return true;
    //     } else {
    //       /* Si retorno true, aparece el mensaje de error */
    //         return false;
    //     }
    // }).withMessage('Las contraseñas deben ser iguales'),
    /* Validación de extensiones de los archivos de los avatar */
    /* Con el método body obtengo el valor del campo de 'avatar'| Se utiliza el método "custom" para definir una función de validación personalizada que toma dos parámetros: el valor del campo "avatar" y el objeto de solicitud HTTP "req" */
    body("avatar")
        .custom((value, { req }) => {
            if (!req.file) true;

            let extension = path.extname(req.file.filename).toLowerCase();
            let acceptedExtensions = [".jpg",".jpeg", ".png", ".gif"]
            if (acceptedExtensions.includes(extension)) {
                return false;
            }
        })
        .withMessage("Solo debe seleccionar archivos con extensión JPG, JPEG, PNG o GIF"),
];

/* ------------------- CRUD (Create Read Update Delete) --------------------*/

// MOSTRAR USUARIO/S
router.get("/list", usersController.list); //all users
router.get("/list/:id", usersController.detailUser); //user detail

// CREAR USUARIO
router.get("/register", usersController.add); //muestra el formulario
// valida formulario y crea usuario o muestra los errores
router.post(
    "/register",
    upload.single("avatar"),
    [
        /* Validaciones para realizar el registro */
        body("firstName").isLength({ min: 1 }).withMessage("El campo nombre no puede estar vacío"),
        body("lastName").isLength({ min: 1 }).withMessage("El campo apellido no puede estar vacío"),
        body("nameUser").isLength({ min: 1 }).withMessage("El campo nombre de usuario no puede estar vacío"),
        body("email").isEmail().withMessage("Agregar un email válido"),
        /* Aquí valido si el usuario ya se encuentra registrado con ese email */
        body("email")
            .custom(value => User.findAll().then(users => !users.some(user => user.email == value)))
            /* Explicación: Debe recibir TRUE si se muestra el ERROR. ERROR sería q NO EXISTE el EMAIL en la db. Some devuelve true si existe el mail y false si no existe, justo lo contrario a lo que queremos que devuelva. Al poner '!' se niega el resultado y conseguimos el objetivo.*/
            .withMessage("El email ya se encuentra registrado"),

        /* Validación de contraseña y confirmación de contraseña*/
        body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener un mínimo de 6 caracteres, al menos una letra y un número"),
        /* body('confirm_password').isLength({ min: 6 }).withMessage('La confirmación de la contraseña debe tener un mínimo de 6 caracteres'), */
        /* Aquí valido que ambas contraseñas sean iguales. El value viene a ser el valor del name"" en el InputDeviceInfo. El valor {req} corresponde a lo que viene desde el formulario. */
        body("passwordConfirmed")
            .custom((value, { req }) => (req.body.password == value ? false : true))
            /* Si retorna true aparece el mensaje de error. De lo contrario no */
            .withMessage("Las contraseñas deben ser iguales"),
        /* Validación de extensiones de los archivos de los avatar */
        /* Con el método body obtengo el valor del campo de 'avatar'| Se utiliza el método "custom" para definir una función de validación personalizada que toma dos parámetros: el valor del campo "avatar" y el objeto de solicitud HTTP "req" */
        body("avatar")
            .custom((value, { req }) => {
                if (!req.file) return true;

                let extension = path.extname(req.file.filename).toLowerCase();
                if (extension == ".jpg" || extension == ".jpeg" || extension == ".png" || extension == ".gif") {
                    return false;
                }
                return true;
            })
            .withMessage("Solo debe seleccionar archivos con extensión JPG, JPEG, PNG o GIF"),
    ],
    usersController.create
);

// EDITAR CUENTA
router.get("/edit/:id", usersController.edit); //muestra el formulario
router.post("/edit/:id", upload.single("avatar"), validateUser, usersController.update); //procesa el formulario

//ELIMINAR CUENTA
router.post("/delete/:id", usersController.delete);

/* ---------------------RUTAS DE USERS-LOGIN ------------------------*/
router.get("/login", usersController.login); //muestra login
// valida login
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Email invalido"),
        body("email")
            .custom(value => User.findAll().then(users => users.some(user => user.email == value))),
        body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener un mínimo de 6 caracteres, al menos una letra y un número"),
    ],
    usersController.loginPost
);

// Perfil del usuario
/* router.get('/profile', guestMiddleware, usersController.profile); */
router.get("/profile/:id", usersController.profile);

/* ---------------- Fin Listado de rutas -------------------*/
module.exports = router;
