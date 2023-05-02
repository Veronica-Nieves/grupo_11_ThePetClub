const express = require('express');
const router = express.Router();


const mainController = require('../controllers/mainController');

/* ------------------- Listado de rutas --------------------*/
router.get('/', mainController.index);

router.get('/contacto/', mainController.contacto);




/* ---------------- Fin Listado de rutas -------------------*/
module.exports = router;
