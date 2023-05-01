const express = require("express");
const router = express.Router();

// ******************** CONTROLLER ********************
const usersController = require("../controllers/userControllerNuevo");

// ******************** MIDDLEWARES ********************
const guestMiddleware = require("../middlewares/routes/guestMiddleware");
const authMiddleware = require('../middlewares/routes/authMiddleware');
const upload = require("../middlewares/routes/user/multerMiddleware")
const validateRegister = require("../middlewares/routes/user/validateRegisterMiddleware");
const validateEdit = require("../middlewares/routes/user/validateEditMiddleware");
const validateLogin = require("../middlewares/routes/user/validateLoginMiddleware")


// ******************** RUTAS ********************
// MOSTRAR USUARIO/S
router.get("/list", usersController.list); //all users
router.get("/list/:id", usersController.detailUser); //user detail

// CREAR
router.get("/register", usersController.add); //muestra el formulario
router.post("/register", upload.single("avatar"), validateRegister, usersController.create); //valida formulario y crea usuario o muestra los errores

// EDITAR
router.get("/edit", usersController.edit); //muestra el formulario
router.post("/edit", upload.single("avatar"), validateEdit, usersController.update); //procesa formulario

//ELIMINAR
router.post("/delete/:id", usersController.delete);

// LOGIN
router.get("/login", usersController.login); //muestra login
router.post("/login", validateLogin, usersController.loginPost); //valida login

// PERFIL
router.get("/profile", /*guestMiddleware,*/ usersController.profile);

module.exports = router;
