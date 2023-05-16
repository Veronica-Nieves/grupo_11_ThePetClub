/* Middleware para controlar el acceso del usuario usando Sequelize */
const { User } = require("../../database/models");

module.exports = (req, res, next) => {
    /* La variable locals vive en las vistas, es global. Se crea la propiedad user */
    res.locals.user = req.session.user;
    
    if (!req.session.user && req.cookies.id) {
        User.findByPk(req.cookies.id).then(user => {
            delete user.dataValues.password;
            delete user.dataValues.password_confirmed;

            req.session.user = user;
            res.locals.user = user;
        });
    }
    next();
};
