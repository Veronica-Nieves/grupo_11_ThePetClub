const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

/* ------------------- Listado de rutas --------------------*/
router.get('/', mainController.index);





/* ---------------- Fin Listado de rutas -------------------*/
module.exports = router;
