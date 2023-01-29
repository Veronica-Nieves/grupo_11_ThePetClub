const express= require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

/* ------------------- Listado de rutas --------------------*/

router.get('/list/', productsController.list);

router.get('/detail/:id', productsController.detail);

router.get('/create/', productsController.create);

//router.post('/create/', productsController.processCreate);
router.post('/create/', productsController.processCreate);

router.get('/newcreate', productsController.newCreate);
router.post('/newcreate', productsController.processNewCreate);

router.get('/edit/', productsController.edit);

router.get('/carrito-compras', productsController.carrito);

/* ---------------- Fin Listado de rutas -------------------*/

module.exports =router;
