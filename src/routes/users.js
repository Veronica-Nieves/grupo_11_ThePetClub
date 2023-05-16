const express = require("express");
const router = express.Router();

// ******************** CONTROLLER ********************
const usersController = require("../controllers/userControllerNuevo");

// ******************** MIDDLEWARES ********************
const guestMiddleware = require("../middlewares/routes/guestMiddleware");
const authMiddleware = require("../middlewares/routes/authMiddleware");
const upload = require("../middlewares/routes/user/multerMiddleware");
const validate = require("../middlewares/routes/user/validationsMiddleware");

// ******************** RUTAS ********************
// MOSTRAR USUARIO/S
router.get("/list", usersController.list); //all users
router.get("/list/:id", usersController.detailUser); //user detail

// CREAR
router.get("/register", guestMiddleware, usersController.add); //muestra el formulario
router.post("/register", upload.single("avatar"), validate.register, usersController.create); //valida formulario y crea usuario o muestra los errores

// EDITAR
router.get("/edit", authMiddleware, usersController.edit); //muestra el formulario
router.post("/edit", upload.single("avatar"), validate.edit, usersController.update); //procesa formulario

//ELIMINAR
router.post("/delete/:id", usersController.delete);

// LOGIN
router.get("/login", guestMiddleware, usersController.login); //muestra login
router.post("/login", validate.login, usersController.loginPost); //valida login

// LOGOUT
router.get("/logout", authMiddleware, usersController.logout);

// PERFIL
router.get("/profile", authMiddleware, usersController.profile);

module.exports = router;
