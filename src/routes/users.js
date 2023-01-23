const express= require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

/* ------------------- Listado de rutas de users --------------------*/

router.get('/register/', usersController.register);

router.get('/login/', usersController.login);


/* ---------------- Fin Listado de rutas -------------------*/
module.exports = router;
