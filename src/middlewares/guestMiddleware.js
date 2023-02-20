/* Esta Middleware se encarga de revisar que el usuario NO esté checkeado (con sesion iniciada)*/
function guestMiddleware (req, res, next) {
    if (req.session.usuarioLogueado == undefined){
        next();
    }
    else {
        res.send("Esta página es solo para invitados");
    }
}

module.exports = guestMiddleware;