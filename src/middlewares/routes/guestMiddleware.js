/* Esta Middleware se encarga de revisar que el usuario NO esté checkeado (con sesion iniciada)*/
function guestMiddleware (req, res, next) {
    if (req.session.user)
        return res.redirect('/users/profile')
    next();
}

module.exports = guestMiddleware;