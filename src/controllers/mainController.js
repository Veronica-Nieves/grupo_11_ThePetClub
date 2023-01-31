const fs = require('fs');
const path = require('path');
/* En la constante "products" ya tienen los productos que están 
	guardados en la carpeta Data como Json (un array de objetos literales) */
	const productsFilePath = path.join(__dirname, '../data/productsIndex.json');
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/* dentro de la variable controller listamos la lógica de cada método*/
const controller = {
	index: (req, res) => {
	const productsRead= JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


	let productsSaleFilter = productsRead.filter( producto => {
		return producto.offer == "si, sale en home"
	})

	let productsFeaturedForHome = productsRead.filter( producto => {
		return producto.featured == "Destacado para home"
	})

		// el primer parámetro que se pasa, es el que se utiliza en ejs
		res.render("index", {
			productsSale: productsSaleFilter,
			productsFeatured: productsFeaturedForHome}
			);
	}
};

module.exports = controller;