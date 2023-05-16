const path = require("path");
const { body } = require("express-validator");
const { User } = require("../../../database/models");
const bcrypt = require("bcryptjs");

module.exports = {
    register: [
        body("firstName").notEmpty().withMessage("Debes ingresar tu nombre"),
        body("lastName").notEmpty().withMessage("Debes ingresar tu apellido"),
        body("nameUser").notEmpty().withMessage("Debes ingresar un nombre de usuario"),
        body("email").notEmpty().withMessage("Debes ingresar tu email").bail()
            .isEmail().withMessage("Debes ingresar un formato de correo válido").bail()
            .custom(value =>
                User.findOne({ where: { email: value } }).then(user => {
                    if (!user) return true;
                    throw new Error("El email ya se encuentra registrado");
                })
            ),
        body("password").isLength({ min: 8 }).withMessage("Debes ingresar una contraseña con al menos 8 caracteres"),
        body("passwordConfirmed").notEmpty().withMessage("Debes confirmar la contraseña").bail()
            .custom((value, { req }) => {
                if (value == req.body.password) return true;
                throw new Error("Las contraseñas no coinciden");
            }),
        body("avatar").custom((value, { req }) => {
            if (req.file) {
                let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
                let fileExtension = path.extname(req.file.originalname);
                if (!acceptedExtensions.includes(fileExtension))
                    throw new Error("Las extensiones de archivos permitidas son " + acceptedExtensions.join("  "));
            }
            return true;
        })
    ],
    login: [
        body("email").notEmpty().withMessage("Debes ingresar tu email").bail()
            .isEmail().withMessage("Debes ingresar un formato de correo válido").bail(),
        body("password").notEmpty().withMessage("Debes ingresar una contraseña").bail()
            .custom((value, { req }) =>
                User.findOne({ where: { email: req.body.email } }).then(user => {
                    if(!user) throw new Error("El email y/o la contraseña son inválidos")
                    if (bcrypt.compareSync(value, user.password)) return true;
                    throw new Error("El email y/o la contraseña son inválidos");
                })
            )
    ],
    edit: [
        body("firstName").notEmpty().withMessage("Debes ingresar tu nombre"),
        body("lastName").notEmpty().withMessage("Debes ingresar tu apellido"),
        body("nameUser").notEmpty().withMessage("Debes ingresar un nombre de usuario"),
        body("avatar").custom((value, { req }) => {
            if (req.file) {
                let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
                let fileExtension = path.extname(req.file.originalname);
                if (!acceptedExtensions.includes(fileExtension))
                    throw new Error("Las extensiones de archivos permitidas son " + acceptedExtensions.join("  "));
            }
            return true;
        })
    ]
}