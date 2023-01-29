const fs=require('fs');
const path = require('path');

/* Leemos los datos de productsBBDD.json y lo convertimos a un array*/
const productsFilePath = path.join(__dirname, '../data/productsBBDD.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


/* ------------------------ M É T O D O S ---------------------------*/
/* dentro de la variable controller listamos la lógica de cada método*/
const controller = {

// listado de todos los productos (tambien llamado index)
  list: (req, res) => {
    const productsArray = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    res.render('./products/products-list', {products: productsArray})
	},

// muestra la vista del detalle del producto correpondiente al id pasado en la url
  detail: (req, res) => {
    const productsArray = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    let productoSolicitado = productsArray.find(producto => {
      return producto.id == req.params.id;
    });
    console.log(productoSolicitado)
    res.render('./products/products-detail', {producto: productoSolicitado})
	},

// renderiza el formulario para la carga de un nuevo producto
  create: (req, res) => {
    res.render('./products/products-create');
  },

// procesa los datos enviados en el formulario
  processCreate: (req, res) => {
    //const productsArray = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    //let productoNuevo = "hol2";



    res.send("producto enviado exitosamente");
    console.log(req.body);
    //res.send(req.body);
  },


/* Nacho*/
  edit: (req, res) => {
    res.render('./products/products-create');
    
  },

  carrito: (req, res) => {
    res.render('carrito-compras');
  }, 





}

module.exports = controller;