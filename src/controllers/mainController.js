const fs = require('fs');
const path = require('path');

// Leemos los datos desde la base de datos de workbench a través de los modelos
const db = require('../database/models');


/* En la constante "products" ya tienen los productos que están 
	guardados en la carpeta Data como Json (un array de objetos literales) */
	const productsFilePath = path.join(__dirname, '../data/productsBBDD.json');
	//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/* ------------------------ M É T O D O S ---------------------------*/
/* dentro de la variable controller listamos la lógica de cada método*/
const controller = {

// Listado de productos en home
	index: (req, res) => {

		db.products.findAll({
			where: { offer: "oferta en home" }
			})
			.then(function(homeOfferProducts){

		db.products.findAll({
		where: { featured: "destacado de home" }
			})
			.then(function(homeFeaturedProducts){

			res.render("index", {
				productsSale: homeOfferProducts,
				productsFeatured: homeFeaturedProducts,
				});
			})
			})
				
		}
};

module.exports = controller;