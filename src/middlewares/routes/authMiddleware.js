/* Esta Middleware se encarga de revisar si el usuario está checkeado (con sesion iniciada)*/
function authMiddleware (req, res, next) {
    if (req.session.user) next();
    res.redirect('/users/login');
}

module.exports = authMiddleware;