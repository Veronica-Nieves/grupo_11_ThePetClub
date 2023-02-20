/* Esta Middleware se encarga de revisar si el usuario está checkeado (con sesion iniciada)*/
function authMiddleware (req, res, next) {
    if (req.session.usuarioLogueado != undefined){
        next();
    }
    else {
        res.send("Esta página es solo para usuarios");
    }
}

module.exports = authMiddleware;