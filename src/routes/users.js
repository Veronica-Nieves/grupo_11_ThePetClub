const express = require("express");
const router = express.Router();

// ******************** CONTROLLER ********************
const userController = require("../controllers/userControllerNuevo");

// ******************** MIDDLEWARES ********************
const guestMiddleware = require("../middlewares/routes/guestMiddleware");
const authMiddleware = require("../middlewares/routes/authMiddleware");
const upload = require("../middlewares/routes/user/multerMiddleware");
const validate = require("../middlewares/routes/user/validationsMiddleware");

// ******************** RUTAS ********************
// MOSTRAR USUARIO/S
router.get("/list", userController.list); //all users
router.get("/list/:id", userController.detailUser); //user detail

// CREAR
router.get("/register", guestMiddleware, userController.add); //muestra el formulario
router.post("/register", upload.single("avatar"), validate.register, userController.create); //valida formulario y crea usuario o muestra los errores

// EDITAR
router.get("/edit", authMiddleware, userController.edit); //muestra el formulario
router.post("/edit", upload.single("avatar"), validate.edit, userController.update); //procesa formulario

//ELIMINAR
router.post("/delete/:id", userController.delete);

// LOGIN
router.get("/login", guestMiddleware, userController.login); //muestra login
router.post("/login", validate.login, userController.loginPost); //valida login

// LOGOUT
router.get("/logout", authMiddleware, userController.logout);

// PERFIL
router.get("/profile", authMiddleware, userController.profile);

module.exports = router;
