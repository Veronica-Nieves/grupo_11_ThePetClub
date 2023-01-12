const fs=require('fs');
const path = require('path');

/* dentro de la variable controller listamos la lógica de cada método*/
const controller = {
  //cree el método para la vista del listado de productos
  list: (req, res) => {
    res.render('productslist')
	},

  detail: (req, res) => {
		//res.send("Estamos en la vista de crear producto")
    res.render('products-detail');
	},

  create: (req, res) => {
    res.render('products-create');
  },

  edit: (req, res) => {
    res.render('products-edit');
  },

  carrito: (req, res) => {
    res.render('carrito-compras');
  }, 





}

module.exports = controller;