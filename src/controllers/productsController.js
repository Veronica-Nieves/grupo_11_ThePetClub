const fs=require('fs');
const path = require('path');

/* dentro de la variable controller listamos la lógica de cada mmétodo*/
const controller = {
    
    
    
    create: (req, res) => {
		//res.send("Estamos en la vista de crear producto")
        res.render('home.ejs');
	}




}
module.exports = controller;