/* Esta Middleware se encarga de revisar que el usuario NO esté checkeado (con sesion iniciada)*/
function guestMiddleware (req, res, next) {
    if (req.session.usuarioLogueado == undefined){
        res.redirect('/users/login/')

    }
    else {
        next();
    }
}

module.exports = guestMiddleware;