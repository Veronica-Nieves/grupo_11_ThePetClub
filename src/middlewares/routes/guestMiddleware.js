/* Esta Middleware se encarga de revisar que el usuario NO esté checkeado (con sesion iniciada)*/
function guestMiddleware (req, res, next) {
    if (req.session.userLogged == undefined){
        res.redirect('/user-profile')

    } next();
}

module.exports = guestMiddleware;