// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const carritoController = require('../controllers/carritoController');

router.get('/carrito-compras', carritoController.carrito-compras); 

module.exports = router;