const fs=require('fs');
const path = require('path');

const { validationResult } = require('express-validator')

const User = require ('../models/Users');
const { findAll } = require('../models/Users');

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
            return res.render('./users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        User.create(req.body);
        return res.send('Ok, las validaciones estan correctas');
	},

        /* ---------------------RUTAS DE USERS-LOGIN ------------------------*/

    login: (req, res) => {
        return res.render('./users/login', {error: undefined})
	},

    profile: (req, res) => {
        return res.render('./users/user-profile', {usuario: []})
    },

    processLogin: (req, res) => {
    /* Leemos los datos de users.json y lo convertimos a un array*/
    let allUsers = JSON.parse(fs.readFileSync('src/data/users.json', 'utf-8'));;
    // definimos bcrypt para poder usarla pero deberia ir por fuera del controller
    const bcrypt = require('bcryptjs');
  
    let userToVerify = allUsers.find(user => {
      return user.email == req.body.email
    });
    let verifyErrors = [];
  
    if(userToVerify == undefined){
      res.render('./users/login', {error: "El usuario no se encuentra registrado. Vuelve a intentarlo."})
    } else if ( !(bcrypt.compareSync(req.body.password, userToVerify.password)) ) {
      res.render('./users/login', {error: "Credenciales invalidas"})
    } else {
      // Si el correo está registrado y la contraseña encryptada conincide, entonces guardamos al usuario logueado
      req.session.usuarioLogueado = userToVerify;
      console.log(userToVerify);
      res.redirect('/profile/:userId'), {usuario: userToVerify};
    }
  },
  
 
  /* ------------------FIN RUTAS DE USERS-LOGIN ----------------------*/

}

module.exports = controller;