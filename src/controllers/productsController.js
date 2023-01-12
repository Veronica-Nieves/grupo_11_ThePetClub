const fs=require('fs');
const path = require('path');

/* dentro de la variable controller listamos la lógica de cada mmétodo*/
const controller = {
    
  detail: (req, res) => {
		//res.send("Estamos en la vista de crear producto")
    res.render('products-detail');
	},

  create: (req, res) => {
    res.render('products-create');
  },

  edit: (req, res) => {
    res.render('products-edit');
  }




}
module.exports = controller;