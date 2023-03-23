const express= require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')
/* Variable creada por sequelize para conectar la base de datos */
const db  = require("../database/models")
/* Asocia el modelo "User" de la base de datos "db" */
const User = require("../database/models/User");

const controller = {
    /* Busca todos los usuarios y los muestra en la ruta /list */
    list: function(req, res){
        db.User.findAll()
        .then(function(users){
            res.render("user-list", {usuarios: users})
            console.log()
        })
    },
    /* Busca todos los usuarios y los muestra en la ruta /list/:id */
    detailUser: function(req, res){
        db.User.findbyPK(req.params.id)
        .then(function(users){
            res.render("user-detail", {usuarios:users})
        })
    },
    /* Renderiza el formulario para crear un registro de usuario */
    add: function(req, res){
        return res.render('./users/register');
    },  
    /* Crea el nuevo usuario si es que pasa las validaciones */
    create: function(req, res){
        
        db.User.create({
            fisrt_name: req.body.firstName,
            last_name: req.body.lastName,
            user_name: req.body.nameUser,
            email: req.body.email,
            password: req.body.password,
            password_confirmed: req.body.passwordConfirmed,
            avatar: req.file ? req.file.filename : '',
            rol_id: req.body.role
        });
        res.redirect('/users/login');
    },
    edit: function(req, res) {
        db.User.findbyPK(req.params.id)
        .then(function(users){
            res.render("user-edit", {usuarios:users})
        })
    },
    update: function(req, res){
        db.User.update({
            fisrt_name: req.body.firstName,
            last_name: req.body.lastName,
            /* Para actualizar la contraseña, se debe validar la anterior contraseña (PENDIENTE)
            password: bcrypt.hashSync(req.body.password, 10),
            password_confirmed: bcrypt.hashSync(req.body.password, 10), */
            avatar: req.file ? req.file.filename : '',
            rol_id: req.body.role
        }, {
            where: {
                /* Se utiliza params porque es la manera de acceder a parametros que nos llegan en la url */
                id: req.params.id
            }
        });
        res.redirect('/users/profile/' + req.params.id);
    },
    delete: function(req, res){
        db.User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/users/list');
    }
};

module.exports = controller;