const { body } = require("express-validator");
const bcrypt = require("bcryptjs");
const { User } = require("../../../database/models")

module.exports = [
    body("email").notEmpty().withMessage("Debes ingresar tu email").bail()
        .isEmail().withMessage("Debes ingresar un formato de correo válido").bail(),
    body("password").isLength({ min: 8 }).withMessage("Debes ingresar una contraseña con al menos 8 caracteres").bail()
        .custom((value, { req }) =>
            User.findOne({ where: { email: req.body.email } }).then(user => {
                if(!user) throw new Error("El email y/o la contraseña son inválidos")
                if (bcrypt.compareSync(value, user.password)) return true;
                throw new Error("El email y/o la contraseña son inválidos");
            })
        )
]