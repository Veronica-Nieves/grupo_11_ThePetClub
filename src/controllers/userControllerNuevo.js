const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const db = require("../database/models/"); /* Variable creada por sequelize para conectar la base de datos */
const User = db.User; /* Asocia el modelo "User" de la base de datos "db" */

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
    /* Renderiza registro para crear */
    add: (req, res) => {
        res.render("users/register");
    },
    /* Crea registro si pasa las validaciones */
    create: (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("users/register", {
                errors: errors.array(),
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
            avatar: req.file ? req.file.filename : "dog-face.png",
            rol_id: req.body.role,
        };

        User.create(user)
            .then(user => res.redirect("/users/login"))
            .catch(error => {
                console.log(error)
                res.send("Error al conectarse con la base de datos")
            });
    },
    /* Renderiza vista para editar */
    edit: (req, res) => {
        User.findByPk(req.session.user.id).then(user => {
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
                user_name: req.body.nameUser,
                /* Para actualizar la contraseña, se debe validar la anterior contraseña (PENDIENTE)
                password: bcrypt.hashSync(req.body.password, 10),
                password_confirmed: bcrypt.hashSync(req.body.password, 10), */
                avatar: req.file ? req.file.filename : req.body.avatar,
            };
            User.update(user, { where: { id: req.session.user.id } });
                return res.redirect("/users/profile/" );
        }

        /*User.findByPk(req.params.id).then(user => {*/
        User.findByPk(req.session.user.id).then(user => {
            req.body.id = user.id;
            res.render("users/user-edit", {
                usuarios: req.body,
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
        let errors = validationResult(req);
        /* En errors se guardan los errores que ingresan desde la ruta con el uso de validateLogin */
        if (!errors.isEmpty()) {
            return res.render("users/login", {
                errors: errors.mapped(),
                email: req.body.email,
            });
        }
        User.findOne({ where: { email: req.body.email } }).then(user => {
            delete user.dataValues.password;
            delete user.dataValues.password_confirmed;
            req.session.user = user; // Aquí se guarda el usuario logueado en Session

            /* Aquí se verifica si el usuario escogió la opción de ser recordado */
            if (req.body.remember_user) {
                res.cookie("id", user.id, { maxAge: 1000 * 60 * 10 });
            }

            /* Aquí se redirige al usuario al perfil del usuario */
            return res.redirect("/users/profile");
        });
    },
    /* Renderiza perfil */
    profile: (req, res) => {
        res.render("users/user-profile", { usuarios: req.session.user });
    },
    logout: (req, res) => {
        res.clearCookie("id");
        req.session.destroy();
        return res.redirect("/users/login");
    },
};

module.exports = controller;
