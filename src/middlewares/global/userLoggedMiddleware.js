/* Middleware para controlar el acceso del usuario usando Sequelize */
const fs = require('fs');
const path = require('path');

/* Sequelize */
const { User } = require('../database/models');

module.exports = (req, res, next) => {
    /* La variable locals vive en las vistas, es global */
    res.locals.usuario = false;

    if(req.session.usuario){
        req.locals.usuario = req.session.usuario;
        return next();
    } else if(req.cookie.email){
        User.findOne({
            where: {
                email:req.cookies.email
            }
        })
        .then(user => {
            req.session.usuario = user;
            req.locals.usuario = user;

            return next();
        })
    } else {
        return next();
    }

}
function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = User.findByField('email', emailInCookie);

    console.log(userFromCookie);
    if(userFromCookie) {
        req.session.userLogged = userFromCookie;
    }
    
    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    

    next();
}

module.exports = userLoggedMiddleware;