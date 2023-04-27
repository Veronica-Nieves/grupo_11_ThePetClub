const express = require("express");
const router = express.Router();
const apisController = require("../controllers/apisController");

// USUARIOS
router.get("/users", apisController.users);// LISTA
router.get("/users/:id", apisController.userDetail);// DETALLE

// PRODUCTOS
router.get("/products", apisController.products); // LISTA
router.get("/products/:id", apisController.productDetail); // DETALLE

// LISTA DE ESPECIES
router.get("/species", apisController.species);

// LISTA DE CATEGORÍAS
router.get("/species", apisController.categories);

// LISTA DE APIS
router.get("/", apisController.index);

module.exports = router;
