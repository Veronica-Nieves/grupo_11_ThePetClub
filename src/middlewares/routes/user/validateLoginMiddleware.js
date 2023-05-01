const { body } = require("express-validator");
const bcrypt = require("bcryptjs");

module.exports = [
    body("email").notEmpty().withMessage("Debes ingresar tu email").bail()
        .isEmail().withMessage("Debes ingresar un formato de correo válido").bail(),
    body("password").isLength({ min: 8 }).withMessage("Debes ingresar una contraseña con al menos 8 caracteres").bail()
        .custom(value =>
            User.findOne({ where: { email: value } }).then(user => {
                if (bcrypt.compareSync(value, user.password)) return true;
                throw new Error("El email y/o la contraseña son inválidos");
            })
        )
]