const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const {check,validationResult, body} = require('express-validator');

/* Variable creada por sequelize para conectar la base de datos */
const db  = require("../database/models/")

/* Asocia el modelo "User" de la base de datos "db" */
const User = db.User;



const controller = {
    /* Busca todos los usuarios y los muestra en la ruta /list */
    list: function(req, res){
        db.User.findAll()
        .then(function(users){
            res.render(path.resolve(__dirname, "../views/user-list"), {usuarios: users})
            console.log()
        })
    },
    /* Busca todos los usuarios y los muestra en la ruta /list/:id */
    detailUser: function(req, res){
        db.User.findbyPK(req.params.id)
        .then(function(users){
            res.render(path.resolve(__dirname, "../views/user-detail"), {usuarios:users})
        })
    },
    /* Renderiza el formulario para crear un registro de usuario */
    add: function(req, res){
        return res.render(path.resolve(__dirname, '../views/users/register'));
    },  
    /* Crea el nuevo usuario si es que pasa las validaciones */
    create: function(req, res){
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render(path.resolve(__dirname, '../views/users/register'), {
                errors: errors.errors, old: req.body
            });
        }
        let user = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            user_name: req.body.nameUser,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            password_confirmed: bcrypt.hashSync(req.body.passwordConfirmed, 10),
            avatar: req.file ? req.file.filename : '',
            rol_id: req.body.role
        }
        db.User.create(user)
        .then((storedUser) => {
            return res.redirect('/users/login')
        })
        .catch(error => console.log(error))
    },
    edit: function(req, res) {
        db.User.findByPk(req.params.id)
        .then(function(users){
            res.render("users/user-edit", { usuarios:users })
        })
    },  
    update: function(req, res){
        db.User.update({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            /* Para actualizar la contraseña, se debe validar la anterior contraseña (PENDIENTE)
            password: bcrypt.hashSync(req.body.password, 10),
            password_confirmed: bcrypt.hashSync(req.body.password, 10), */
            // avatar: req.file ? req.file.filename : '',
            // rol_id: req.body.role
        }, {
            where: {
                /* Se utiliza params porque es la manera de acceder a parametros que nos llegan en la url */
                id: req.params.id
            }
        }).then(function() {
            db.User.findByPk(req.params.id).then(function(user) {
            return res.render('users/user-profile', { usuarios: user });
            });
            }).catch(function(error) {
            console.log(error);
            return res.status(500).send('Error interno del servidor');
            });
        /* ;
        return res.render('users/user-profile', { usuarios:users }); */
    },
    delete: function(req, res){
        db.User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/users/list', { usuarios:users });
    },
    login: function(req, res){
        res.render(path.resolve(__dirname, '../views/users/login'))
    },
    loginPost: function(req, res){
        db.User.findAll()
        .then((users) => {
            /* En errors se guardan los errores que ingresan desde la ruta con el uso de validationResult */
            let errors = validationResult(req);

            let userLogin = [];

            if(req.body.email != '' && req.body.password != ''){
                userLogin = users.filter(function(user){
                    return user.email === req.body.email
                });
                /* Aquí se verifica si la contraseña que esta ingresando el usuario ya registrado, es la misma que está hasheada en la db | Se usa el compareSync que retorna un true ó false */
                if(!userLogin[0] || bcrypt.compareSync(req.body.password, userLogin[0].password) === false){
                    userLogin = [0];
                }
            }
            /* Aquí se determina si el usuario fue encontrado ó no en la db */
            if(userLogin.length === 0){
                return res.render(path.resolve(__dirname,'../views/users/login'), {
                    errors: [{ msg: 'Las credenciales son inválidas' }]}); 
            } else {
                /* Aquí se guarda el usuario logueado en Session */
                req.session.usuario = userLogin[0];
            }
            /* Aquí se verifica si el usuario escogio la opción de ser recordado */
            if(req.body.remember_user){
                res.cookie('email', userLogin[0].email,{ maxAge: (1000 * 60) * 2 })
            }
            /* Aquí se redirige al usuario al perfil del usuario */
            return res.redirect('/users/profile/' + userLogin[0].id);
            })
    },
    profile: function(req, res) {
        db.User.findByPk(req.params.id)
        .then(function(users){
            res.render(path.resolve(__dirname, "../views/users/user-profile"), { usuarios: users });
        })
    },
};

module.exports = controller;