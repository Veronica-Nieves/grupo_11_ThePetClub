const fs = require('fs');
const path = require('path');


/* dentro de la variable controller listamos la lógica de cada método*/
const controller = {
	index: (req, res) => {
		res.render("home");
	}
};

module.exports = controller;