const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const {check, body, validationResult} = require('express-validator');

/* Requiero la base de datos */
const db = require('../database/models/');

/* Asocia el modelo "User" de la base de datos "db" */
const User = db.User;

/* Dentro de la variable controller listamos la lógica de cada método*/
const controller = {
    register: (req, res) => {
      return res.render('./users/register');
    },
    create: async (req, res) => {
      const validations = [
        check('firstName').isLength({ min: 1 }).withMessage('El campo nombre no puede estar vacío'),
        check('lastName').isLength({ min: 1 }).withMessage('El campo apellido no puede estar vacío'),
        check('nameUser').isLength({ min: 1 }).withMessage('El campo nombre de usuario no puede estar vacío'),
        check('email').isEmail().withMessage('Agregar un email válido'),
        check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener un mínimo de 6 caracteres, al menos una letra y un número'),
        check('confirm_password').isLength({ min: 6 }).withMessage('La confirmación de la contraseña debe tener un mínimo de 6 caracteres'),
        body('confirm_password').custom((value, { req }) => {
          if (req.body.password == value) {
            return true;
          } else {
            return false;
          }
        }).withMessage('Las contraseñas deben ser iguales'),
        body('avatar').custom(function (value, { req }) {
          if (!req.file) {
            return true;
          }
          let extension = "" + path.extname(req.file[0].filename).toLowerCase();
          if (
              extension == '.jpg' || 
              extension == '.jpeg' || 
              extension == '.png' || 
              extension == '.gif') {
            return true;
          }
          return false;
        }).withMessage('Solo debe seleccionar archivos con extensión JPG, JPEG, PNG o GIF')
      ];
  
      Promise.all(validations.map(validation => validation.run(req)))
        .then(() => {
          let errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.render(path.resolve(__dirname, './users/register'), {
              errors: errors.errors, old: req.body
            });
          }
  
          let user = {
            fisrt_name: req.body.firstName,
            last_name: req.body.lastName,
            user_name: req.body.nameUser,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            password_confirmed: bcrypt.hashSync(req.body.password, 10),
            avatar: req.file ? req.file.filename : '',
            rol_id: req.body.role
          };
          User.create(user)
            .then((storedUser) => {
              return res.redirect('/users/login');
            })
            .catch(error => console.log(error));
        })
        .catch(errors => {
          console.log(errors);
        });
    }
  };
  
  module.exports = controller;