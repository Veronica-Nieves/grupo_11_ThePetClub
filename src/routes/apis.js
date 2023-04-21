const express = require("express");
const router = express.Router();
const apisController = require('../controllers/apisController')

// API LISTA DE USUARIOS
router.get("/users", apisController.users);

// API DETALLE DEL USUARIO
router.get("/users/:id", apisController.userDetail);

// API LISTA DE PRODUCTOS
router.get("/products", apisController.products);

// API DETALLE DEL PRODUCTO
router.get("/products/:id", apisController.productDetail);

// LISTA DE APIS
router.get("/", apisController.index);

module.exports = router;
