const db = require("../database/models");
const User = db.User;

const controller = {
/*
api/users
Deberá devolver un objeto literal con la siguiente estructura:
count → cantidad total de usuarios en la base
users → array con la colección de usuarios, cada uno con:
id
name
email
detail → URL para obtener el detalle. .*/
    users: (req, res) => {
        User.findAll().then((users) => {
            users = users.map((user) => {
                return {
                    id: user.id,
                    name: user.first_name,
                    email: user.email,
                    detalle: "http://localhost:3002/api/users/" + user.id,
                };
            });
            res.json({
                count: users.length,
                users: users,
            });
        });
    },
/*
api/users/:id
Deberá devolver un objeto literal con la siguiente estructura:
Una propiedad por cada campo en base
Una URL para la imagen de perfil (para mostrar la imagen)
Sin información sensible (ej: password y categoría).*/
    userDetail: (req, res) => {
        User.findByPk(req.params.id).then((user) => {
            res.json({
                id: user.id,
                email: user.email,
                userName: user.user_name,
                name: user.first_name,
                lastName: user.last_name,
                avatar: user.avatar,
            });
        });
    },

    products: (req, res) => {},

    productDetail: (req, res) => {},
};

module.exports = controller;
