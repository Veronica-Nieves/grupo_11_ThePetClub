/* Esta Middleware se encarga de revisar si el usuario está checkeado (con sesion iniciada)*/
function authMiddleware (req, res, next) {
    if (!req.session.userLogged){
        res.redirect('/users/login');
    } next();
}

module.exports = authMiddleware;