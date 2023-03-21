const fs=require('fs');
const path = require('path');
const { Association } = require('sequelize');

// Leemos los datos desde la base de datos de workbench a través de los modelos
const db = require('../database/models');

/* ------------------------ M É T O D O S ---------------------------*/
/* dentro de la variable controller listamos la lógica de cada método*/
const controller = {

  conexion:(req, res) => {
    db.products.findAll({
        include:["specie","category"],
      })
      .then(function(productList){
        res.send(productList)
      })
  },

// Listado de todos los productos 
  list: (req, res) => {
    db.products.findAll()
      .then(function(productList){
        res.render('./products/products-list', {products: productList})
      })
      .catch((error) => {
        res.send(error)
      })
	},

// Vista del detalle del producto correpondiente al id pasado en la url
  detail: async(req, res) => {
    db.products.findByPk(req.params.id,{
      include:["specie", "category"],
    })
      .then(function(product){
        res.render('./products/products-detail', {producto: product});
        console.log(product)
      })
	}, 

// Crear un nuevo producto
  create: async(req, res) => {
    db.species.findAll()
    .then(function(especies){
          db.category.findAll()
          .then(function(categorias){
              res.render('./products/products-create', {especies: especies, categorias: categorias});
          })
    });
    
  },

//Proceso de guardar al producto creado
  processCreate: (req, res) => {

    db.products.create({
      sku: req.body.sku,
      name: req.body.name,
      description: req.body.description,
      image: req.file ? req.file.filename : "product-default-image.jpg",
      price: req.body.price,
      price_offer: req.body.priceOffer,
      specie_id: req.body.specie,
      category_id: req.body.category,
      offer: req.body.offer,
      featured: req.body.featured,
      pieces: req.body.pieces
    })
    res.redirect('/products');
  }, 

// Editar un producto
  edit: async(req, res) => {

    db.species.findAll()
      .then(function(especies){
    
    db.category.findAll()
      .then(function(categorias){
    
    db.products.findByPk(req.params.id)
      .then((productToEdit) => {
    
      res.render("./products/products-edit", {productToEdit: productToEdit, especies: especies, categorias: categorias})
      //console.log(productToEdit)
      })
      })
      })
    },

// Guardar un producto editado
  update: (req,res) => {
     
    db.products.update({
      sku: req.body.sku,
      name: req.body.name,
      description: req.body.description,
      //image: req.file ? req.file.filename : "product-default-image.jpg",
      price: req.body.price,
      price_offer: req.body.priceOffer,
      specie_id: req.body.specie,
      category_id: req.body.category,
      offer: req.body.offer,
      featured: req.body.featured,
      pieces: req.body.pieces
    }, {
      where: {
        id: req.params.id
      }
    });

    res.redirect("/products/detail/" + req.params.id)

  },

  carrito: (req, res) => {
    res.render('carrito-compras');
  }, 

// Eliminar un producto por id
  delete: (req, res) => {
    db.products.destroy({
        where: { 
          id:req.params.id
        }
    })
    res.redirect("/products/");
  },

}

module.exports = controller;