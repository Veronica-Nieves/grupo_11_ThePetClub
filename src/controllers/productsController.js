const fs=require('fs');
const path = require('path');

// leemos los datos desde la base de datos de workbench a través de los modelos
const db = require("../database/models");

/* Leemos los datos de productsBBDD.json y lo convertimos a un array*/
const productsFilePath = path.join(__dirname, '../data/productsBBDD.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


/* ------------------------ M É T O D O S ---------------------------*/
/* dentro de la variable controller listamos la lógica de cada método*/
const controller = {

// SOLO PARA PROBAR LA CONEXION CON LA BASE DE DATOS, listado de todos las especies. 
  especies: (req, res) => {
    //db.Specie.findAll() // Este funciona bien
    //db.Category.findAll() // Este funciona bien
    db.Product.findAll()
      .then(function(especies) {
        res.send(especies);
      });
  },

// listado de todos los productos (tambien llamado index)
  list: (req, res) => {
    db.Product.findAll()
      .then(function(productList){
        res.render('./products/products-list', {products: productList})
      })
    
	},


// muestra la vista del detalle del producto correpondiente al id pasado en la url
  detail: (req, res) => {
    db.Product.findByPk(req.params.id)
      // falta conectar las relaciones con los id de especie y categorias
      /*,{
      include:[
        {association: "specie"}
      ]})*/
      .then(function(product){
        res.render('./products/products-detail', {producto: product})
        console.log(product)
      })
	},  


// renderiza el formulario para la carga de un nuevo producto tomando desde la bd las especies y las categorias
  create: async(req, res) => {
    db.Specie.findAll()
    .then(function(especies){
          db.Category.findAll()
          .then(function(categorias){
              res.render('./products/products-create', {especies: especies, categorias: categorias});
          })
    });
    
  },


// procesa los datos enviados en el formulariode crear un nuevo producto
  /*processCreate: (req, res) => {
    const productsArray = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

    // Nota: Si el usuario solo selecciona una especie el dato se guarda como string, pero si selecciona dos, se guarda lista. Antes de guardarlo debemos convertirlo SIEMPRE a lista []. Sucede lo mismo con categoría
    let listSpecie = [];
    let listCategory = [];
    if (typeof req.body.specie === 'string') { listSpecie[0] = req.body.specie } else { listSpecie = req.body.specie};
    if (typeof req.body.category === 'string') { listCategory[0] = req.body.category} else { listCategory = req.body.category};

    let productoNuevo = {
      name:req.body.name,
      id: products[products.length-1].id + 1,
      sku: req.body.sku,
      description:req.body.description,
      image: req.file ? req.file.filename : "product-default-image.jpg",
      price:req.body.price,
      priceOffer: req.body.priceOffer,
      specie: listSpecie,
      category: listCategory,
      offer: req.body.offer,
      featured: req.body.featured,
      pieces: req.body.pieces
      }
    //agregamos el nuevo producto en el array de productos
    productsArray.push(productoNuevo);
    fs.writeFileSync(productsFilePath, JSON.stringify(productsArray, null, " "));
    res.redirect("/products/")
  }, */  
  processCreate: (req, res) => {
    db.Product.create({
      sku: req.body.sku,
      name: req.body.name,
      description: req.body.description,
      //image: "product-default-image.jpg",
      image: req.file ? req.file.filename : "product-default-image.jpg",
      price: req.body.price,
      price_offer: req.body.priceOffer,
      specie_id: req.body.specie,
      category_id: req.body.category,
      offer: req.body.offer,
      featured: req.body.featured,
      pieces: req.body.pieces
    })
    res.send (req.body)
  }, 




/*EDITAR PRODUCTO*/
  edit: (req, res) => {

    let id = req.params.id
    const productsArray = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    let productToEdit = productsArray.find(producto =>{
      return producto.id == id
    })

    res.render("./products/products-edit", {productToEdit: productToEdit})
  },

  update: (req,res) => {

    const productsArray = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    let id = req.params.id
    let productoGuardado = productsArray.find(producto =>{
      return producto.id == id
    })

    /* Nota: Si el usuario solo selecciona una especie el dato se guarda como string, pero si selecciona dos, se guarda lista. Antes de guardarlo debemos convertirlo SIEMPRE a lista []. Sucede lo mismo con categoría */
    let listSpecie = [];
    let listCategory = [];
    if (typeof req.body.specie === 'string') { listSpecie[0] = req.body.specie } else { listSpecie = req.body.specie};
    if (typeof req.body.category === 'string') { listCategory[0] = req.body.category} else { listCategory = req.body.category};
		

    let productoEditado = {
      name:req.body.name,
      id: productoGuardado.id, // no cambia
      sku: req.body.sku,
      description:req.body.description,
      // falta configurar que pueda subir una nueva aimagen. De momento se deja la anterior
      image: productoGuardado.image,
      price:req.body.price,
      priceOffer: req.body.priceOffer,
      specie: listSpecie,
      category: listCategory,
      offer: req.body.offer,
      featured: req.body.featured,
      pieces: req.body.pieces
      }

    let indice = productsArray.findIndex(product =>{
      return product.id == id
    });
    
    productsArray[indice] = productoEditado;
    fs.writeFileSync(productsFilePath, JSON.stringify(productsArray, null, " "));
    res.redirect("/products/")
  },

  carrito: (req, res) => {
    res.render('carrito-compras');
  }, 

  /* ELIMINAR */
  delete: (req, res) => {
    let id = req.params.id
    const productsArray = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

    let productosActuales = productsArray.filter(producto => {
      return producto.id != id;
    })

    fs.writeFileSync(productsFilePath, JSON.stringify(productosActuales, null, " "));
    res.redirect("/products/");
  },

}

module.exports = controller;