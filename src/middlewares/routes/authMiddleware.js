/* Esta Middleware se encarga de revisar si el usuario está checkeado (con sesion iniciada)*/
function authMiddleware (req, res, next) {
    if (req.session.usuarioLogueado != undefined){
        res.redirect('/user-profile');
    }
    else {
        next();
    }
}

module.exports = authMiddleware;