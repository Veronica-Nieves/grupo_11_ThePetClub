const fs=require('fs');
const path = require('path');

/* dentro de la variable controller listamos la lógica de cada método*/
const controller = {
    register: (req, res) => {
        res.render('./users/users-register')
	},

    login: (req, res) => {
        res.render('./users/login')
	},
}

module.exports = controller;