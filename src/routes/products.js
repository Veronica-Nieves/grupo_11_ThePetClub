const express= require('express');
const router = express.Router();
const multer = require ("multer");
const path = require("path");
//const guestMiddleware = require('../middlewares/routes/guestMiddleware');
//const authMiddleware = require('../middlewares/routes/authMiddleware');

const { check, body } = require('express-validator') 

const productsController = require('../controllers/productsController');

/* **************************** MULTER ***************************** */

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

/* ************************* Fin-multer **************************** */

/* ******************* VALIDACIONES NEW PRODUCT ******************** */
const validateProducts = [
    check('name')
        .notEmpty().withMessage("Debe ingresar un nombre.")
        .isLength({ min: 5}).withMessage("El nombre debe tener al menos 5 caracteres."),

    check('sku')
        .notEmpty().withMessage("Debe ingresar un SKU.")
        .isLength({ min: 3}).withMessage("El SKU debe tener al menos 3 caracteres.")
        .isAlphanumeric().withMessage("El SKU no debe incluir espacios en blanco ni caracteres especiales."),

    check('description')
        .notEmpty().withMessage("Debe ingresar la descripción del producto.")
        .isLength({ min: 20}).withMessage("La descripción debe tener al menos 20 caracteres."),

    check("price")
        .notEmpty().withMessage("Indique el precio del producto.")
        .isFloat({ min: 0 }).withMessage("El precio debe ser un valor numérico mayor que cero."),

    check("price_offer")
        .notEmpty().withMessage("Indique el precio de oferta del producto (solo se mostratrá si indica que el producto está en oferta).")
        .isFloat({ min: 0 }).withMessage("El precio de oferta debe ser un valor numérico mayor que cero."),

    check("pieces")
        .notEmpty().withMessage("Indique el inventario del producto.")
        .isInt({ min: 0 }).withMessage("El número de piezas de inventario debe ser un valor numérico mayor o igual a cero.")
];

/* -------------- R U T A S   D E   P R O D U C T O S ---------------*/

/* TODOS LOS PRODUCTOS */
router.get('/', productsController.list);

/* IR A UN PRODUCTO */
router.get('/detail/:id', productsController.detail);

/* CREAR UN PRODUCTO */
router.get('/create/', productsController.create);
router.post('/create/', upload.single("image"), validateProducts, productsController.processCreate);

/* EDITAR UN PRODUCTO */
router.get('/edit/:id', productsController.edit);
router.put('/edit/:id', validateProducts, productsController.update)

/* ELIMINAR UN PRODUCTO */
router.delete('/delete/:id', productsController.delete);

/* OTROS */
router.get('/carrito-compras', productsController.carrito);
router.get('/conexion', productsController.conexion);


/* -------------------- F I N   D E   R U T A S ---------------------*/

module.exports = router;
