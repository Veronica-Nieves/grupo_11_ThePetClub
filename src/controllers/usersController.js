const fs=require('fs');
const path = require('path');

const { validationResult } = require('express-validator')

const User = require ('../models/Users');

const bcryptjs = require ('bcryptjs');

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

        let userInDB = User.findByField('email', req.body.email);

        if (userInDB) {
            return res.render('./users/register', {
                errors: {
                    email: {
                        msg: 'Este email ya se encuentra registrado'
                    },
                oldData: req.body
                }
            });
        }

        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password,10),
            passwordConfirmed: bcryptjs.hashSync(req.body.passwordConfirmed,10),
            avatar: req.file.filename
        }

        let userCreate = User.create(userToCreate);
        return res.redirect('/users/login');
	},

        /* ---------------------RUTAS DE LOGIN ------------------------*/

    login: (req, res) => {
        return res.render('./users/login')
	},

    processLogin: (req, res) => {
    
    let userToLogin = User.findByField('email', req.body.email);

    if(userToLogin) {

        let isOkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
       if (isOkPassword) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin; 
        return res.redirect('/users/profile');
       } 

       return res.render('./users/login', {errors: 'Las credenciales son inválidas'}
        );
    }

    return res.render('./users/login', {
        errors: {
            email: {
                msg: 'El usuario no se encuentra registrado'
            }
        }
    })

    },

  profile: (req, res) => {
    return res.render('./users/user-profile', {
        user: req.session.userLogged
        })
    },

  
 
  /* ------------------FIN RUTAS DE USERS-LOGIN ----------------------*/

}

module.exports = controller;