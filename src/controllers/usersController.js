const fs=require('fs');
const path = require('path');

/* dentro de la variable controller listamos la lógica de cada método*/
const controller = {
    register: (req, res) => {
        res.render('./users/users-register')
	},
}

module.exports = controller;