const fs=require('fs');
const path = require('path');

const { validationResult } = require('express-validator')

/* dentro de la variable controller listamos la lógica de cada método*/
const controller = {
    register: (req, res) => {
        return res.render('./users/register')
	},

    processRegister: (req, res) => {
        /* return res.send({
            body: req.body,
            file: req.file
        }); */
        const resultValidation = validationResult(req);
        
        if (resultValidation.errors.length > 0) {
            return res.render('userRegisterForm', {
                errors: resultValidation.mapped(),
            });
        }
	},

    login: (req, res) => {
        return res.render('./users/login')
	},

    profile: (req, res) => {
        return res.render('./users/profile')
    },
}

module.exports = controller;