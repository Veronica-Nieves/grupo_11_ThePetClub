const express= require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

/* ------------------- Listado de rutas --------------------*/

router.get('/list/', productsController.list);

//router.get('/detail/', productsController.detail);
router.get('/detail/:id', productsController.detail);

router.get('/create/', productsController.create);

router.get('/edit/', productsController.edit);

router.get('/carrito-compras', productsController.carrito);

/* ---------------- Fin Listado de rutas -------------------*/

module.exports =router;
