const path = require("path");
const { body } = require("express-validator");
const { User } = require("../../../database/models");

module.exports = [
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
        if (!req.file) throw new Error("Debes subir una imagen");

        let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
        let fileExtension = path.extname(req.file.originalname);
        if (acceptedExtensions.includes(fileExtension)) return true;

        throw new Error("Las extensiones de archivos permitidas son " + acceptedExtensions.join("  "));
    })
]