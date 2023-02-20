const express= require('express');
const router = express.Router();
const multer = require ("multer");
const path = require("path")


/* **************************** multer ***************************** */
const storage = multer.diskStorage({
    destination:function(req, file, cb){
         // ubicación pensada como si estuvieramos en la carpeta raíz del proyecto
        cb(null, "./public/img/productslist")
    },
    filename: function(req, file, cb){
         // nombre único del archivo
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer ({storage: storage});
/* *************************** Fin-multer ************************** */



const productsController = require('../controllers/productsController');

/* -------------- R U T A S   D E   P R O D U C T O S ---------------*/

router.get('/', productsController.list);

router.get('/detail/:id', productsController.detail);

router.get('/create/', productsController.create);

router.post('/create/', upload.single("image") , productsController.processCreate);

router.get('/edit/:id', productsController.edit);

router.put('/edit/:id', productsController.update)

router.delete('/delete/:id', productsController.delete);

router.get('/carrito-compras', productsController.carrito);

/* -------------------- F I N   D E   R U T A S ---------------------*/



/* ---------------------RUTAS DE USERS-LOGIN ------------------------*/

router.get('/login/', productsController.login);
router.post('/login/', upload.single("image") , productsController.processLogin);

/* ------------------FIN RUTAS DE USERS-LOGIN ----------------------*/



module.exports =router;
