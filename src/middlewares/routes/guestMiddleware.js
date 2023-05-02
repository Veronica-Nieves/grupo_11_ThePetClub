/* Esta Middleware se encarga de revisar que el usuario NO esté checkeado (con sesion iniciada)*/
function guestMiddleware (req, res, next) {
    if (req.session.user)
        res.redirect('/users/profile', {usuarios: req.session.user})
    next();
}

module.exports = guestMiddleware;