const path = require("path");
const { body } = require("express-validator");

module.exports = [
    body("firstName").notEmpty().withMessage("Debes ingresar tu nombre"),
    body("lastName").notEmpty().withMessage("Debes ingresar tu apellido"),
    body("nameUser").notEmpty().withMessage("Debes ingresar un nombre de usuario"),
    body("avatar").custom((value, { req }) => {
        if (!req.file) throw new Error("Debes subir una imagen");

        let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
        let fileExtension = path.extname(req.file.originalname);
        if (acceptedExtensions.includes(fileExtension)) return true;

        throw new Error("Las extensiones de archivos permitidas son " + acceptedExtensions.join("  "));
    })
]