const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const { check, validationResult, body } = require("express-validator");

/* Variable creada por sequelize para conectar la base de datos */
const db = require("../database/models/");

/* Asocia el modelo "User" de la base de datos "db" */
const User = db.User;

const controller = {
    /* Busca y muestra todos los usuarios en la ruta /list */
    list: (req, res) => {
        User.findAll().then(users => {
            res.render("users/user-list", { usuarios: users });
        });
    },
    /* Busca y muestra un usuario en la ruta /list/:id */
    detailUser: (req, res) => {
        User.findByPk(req.params.id).then(user => {
            res.render("users/user-detail", { usuarios: user });
        });
    },
    /* Renderiza registro */
    add: (req, res) => {
        res.render("users/register");
    },
    /* Crea registro si pasa las validaciones */
    create: (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("users/register", {
                errors: errors.errors,
                old: req.body,
            });
        }
        let user = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            user_name: req.body.nameUser,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            password_confirmed: bcrypt.hashSync(req.body.passwordConfirmed, 10),
            avatar: req.file ? req.file.filename : "",
            rol_id: req.body.role,
        };
        User.create(user)
            .then(user => res.redirect("/users/login"))
            .catch(error => console.log(error));
    },
    /* Renderiza vista para editar */
    edit: (req, res) => {
        User.findByPk(req.params.id).then(user => {
            res.render("users/user-edit", { usuarios: user });
        });
    },
    /* Procesa formulario para editar */
    update: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let user = {
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                /* Para actualizar la contraseña, se debe validar la anterior contraseña (PENDIENTE)
                password: bcrypt.hashSync(req.body.password, 10),
                password_confirmed: bcrypt.hashSync(req.body.password, 10), */
                avatar: req.file ? req.file.filename : req.body.avatar,
            };
            User.update(user, { where: { id: req.params.id } });
            return res.redirect("/users/user-profile/" + req.params.id);
        }

        User.findByPk(req.params.id).then(user => {
            res.render("users/user-edit", {
                usuarios: req.body,
                userId: user.id,
                errors: errors.array(),
            });
        });
    },
    /* Elimina usuario */
    delete: (req, res) => {
        User.destroy({ where: { id: req.params.id } });
        res.redirect("/users/list");
    },
    /* Renderiza login */
    login: (req, res) => {
        res.render("users/login");
    },
    /* Valida login */
    loginPost: (req, res) => {
        User.findAll().then(users => {
            /* En errors se guardan los errores que ingresan desde la ruta con el uso de validationResult */
            let errors = validationResult(req);

            let userLogin;

            if (errors.isEmpty()) {
                userLogin = users.find(user => user.email === req.body.email);
                /* Aquí se verifica si la contraseña que esta ingresando el usuario ya registrado, es la misma que está hasheada en la db | Se usa el compareSync que retorna un true ó false */
                if (bcrypt.compareSync(req.body.password, userLogin.password) === false) {
                    return res.render("users/login", {
                    errors: errors.mapped(),
                });
                }
            }
            /* Aquí se determina si el usuario fue encontrado ó no en la db */
            if (userLogin.length === 0) {
                
            } else req.session.usuario = userLogin; // Aquí se guarda el usuario logueado en Session

            /* Aquí se verifica si el usuario escogió la opción de ser recordado */
            if (req.body.remember_user) {
                res.cookie("email", userLogin.email, { maxAge: 1000 * 60 * 2 });
            }
            /* Aquí se redirige al usuario al perfil del usuario */
            return res.redirect("/users/profile/" + userLogin.id);
        });
    },
    /* Renderiza perfil */
    profile: (req, res) => {
        User.findByPk(req.params.id).then(user => {
            res.render("users/user-profile", { usuarios: user });
        });
    },
};

module.exports = controller;
