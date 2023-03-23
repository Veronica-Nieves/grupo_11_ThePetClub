const express= require('express');
const router = express.Router();

/* Variable creada por sequelize para conectar la base de datos */
const db  = require("../database/models")

const controller = {
    list: function(){
        db.User.findAll()
        .then(function(users){
            res.render("user-list", {usuarios:users})
        })
    },
    detailUser: function(){
        db.User.findbyPK(req.params.id)
        .then(function(users){
            res.render("user-detail", {usuarios:users})
        })
    }
};

