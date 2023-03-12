const express= require('express');
const router = express.Router();
const multer = require ("multer");
const path = require("path")
const guestMiddleware = require('../middlewares/routes/guestMiddleware');
const authMiddleware = require('../middlewares/routes/authMiddleware');

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

/* TODOS LOS PRODUCTOS */
router.get('/', productsController.list);

/* IR A UN PRODUCTO */
router.get('/detail/:id', productsController.detail);

/* CREAR UN PRODUCTO */
router.get('/create/',guestMiddleware, productsController.create);
router.post('/create/',guestMiddleware,  upload.single("image") , productsController.processCreate);

/* EDITAR UN PRODUCTO */
router.get('/edit/:id',guestMiddleware,  productsController.edit);
router.put('/edit/:id',guestMiddleware,  productsController.update)

/* ELIMINAR UN PRODUCTO */
router.delete('/delete/:id',guestMiddleware, productsController.delete);

router.get('/carrito-compras', productsController.carrito);

/* RUTA TEMPORAL DE ESPECIES - solo para probar conexion con la base de datos */
router.get('/especies', productsController.especies);

/* -------------------- F I N   D E   R U T A S ---------------------*/

module.exports =router;
