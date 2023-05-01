/* Esta Middleware se encarga de revisar que el usuario NO esté checkeado (con sesion iniciada)*/
function guestMiddleware (req, res, next) {
    if (!req.session.user) next();
    res.redirect('/users/login')
}

module.exports = guestMiddleware;