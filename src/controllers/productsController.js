const fs=require('fs');
const path = require('path');

/* dentro de la variable controller listamos la lógica de cada método*/
const controller = {
    
    
    
    create: (req, res) => {
		//res.send("Estamos en la vista de crear producto")
        res.render('products-create');
	}




}
module.exports = controller;