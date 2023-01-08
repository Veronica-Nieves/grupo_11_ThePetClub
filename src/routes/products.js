const express= require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

/* ------------------- Listado de rutas --------------------*/

//router.get('/create/', productsController.create);
router.get('/create/', productsController.create);



/* ---------------- Fin Listado de rutas -------------------*/
module.exports =router;
