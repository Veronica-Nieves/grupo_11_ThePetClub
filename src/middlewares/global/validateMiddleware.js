const path = require('path');
const { body } = require('express-validator');


module.exports = [
    body('firstName').notEmpty().withMessage('Debes escribir tu nombre'),
    body('lastName').notEmpty().withMessage('Debes escribir tu apellido'),
    body('nameUser').notEmpty().withMessage('Debes escribir tu nombre de usuario'),
    body('email')
        .notEmpty().withMessage('Debes escribir tu email').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('password').notEmpty().withMessage('Debes escribir tu contraseña'),
    body('passwordConfirmed').notEmpty().withMessage('Debes escribir la confirmación de contraseña'),
    body('role').notEmpty().withMessage('Debes elegir un rol'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions =  ['.jpg', '.png', '.gif'];

        if (!file) {
            throw new Error('Tienes que subir una imagen')
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivos permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];

