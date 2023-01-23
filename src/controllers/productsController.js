const fs=require('fs');
const path = require('path');

/* Leemos los datos de productsBBDD.json y lo convertimos a un array*/
const productsFilePath = path.join(__dirname, '../data/productsBBDD.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


/* ------------------------ M É T O D O S ---------------------------*/
/* dentro de la variable controller listamos la lógica de cada método*/
const controller = {

  //listado de todos los productos (tambien llamado index)
  list: (req, res) => {
    const productsArray = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    res.render('./products/products-list', {products: productsArray})
	},

  detail: (req, res) => {
    res.render('./products/products-detail');
	},

  create: (req, res) => {
    res.render('./products/products-create');
  },

  edit: (req, res) => {
    res.render('./products/products-edit');
  },

  carrito: (req, res) => {
    res.render('carrito-compras');
  }, 





}

module.exports = controller;