/* Requiero Multer para permitir leer el archivo de el avatar del usuario una vez que se registre */
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/img/avatars");
    },

    filename: (req, file, cb) => {
        let fileName = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    },
});

const upload = multer({ storage });

module.exports = upload;