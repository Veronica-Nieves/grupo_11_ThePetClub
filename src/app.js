// ************ Require's ************
const express = require("express");
const path = require("path");
const session = require("express-session"); //
const cookies = require("cookie-parser");
const methodOverride = require("method-override"); // para poder usar los métodos PUT y DELETE

// ************ express() ************
const app = express();

// ************ Middlewares ************
app.use(express.static(path.join(__dirname, "../public"))); // Necesario para los archivos estáticos
app.use(express.urlencoded({ extended: false })); // para capturar el body de los formularios
app.use(express.json()); // capturar el body de los forms en formato JSON
app.use(methodOverride("_method")); // para poder usar los métodos PUT y DELETE
app.use(cookies());
app.use(session({ secret: "The Pets Club", resave: false, saveUninitialized: true })); // para habilitar las sesiones

// ************ Middlewares propios ************
const userLoggedMiddleware = require("./middlewares/global/userLoggedMiddleware.js");
app.use(userLoggedMiddleware)

// ************ Template Engine ************
app.set("view engine", "ejs"); // para indicarle que las vistas son de tipo ejs
app.set("views", path.join(__dirname, "/views")); // definimos ubicación de la carpeta views

// ************ Route System require and use() ************
const mainRouter = require("./routes/main.js"); // Rutas main
const productsRouter = require("./routes/products.js"); // Rutas /products
const usersRouter = require("./routes/users.js"); // Rutas /users
const apiRouter = require("./routes/apis.js"); // Rutas /users

app.use("/", mainRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/api", apiRouter);


// ********** Probamos conexion  con la base de datos local **********
var mysql2 = require("mysql2"); //<----- requiere: npm install mysql2

var conexion = mysql2.createConnection({
    host: "127.0.0.1",
    database: "the_pets_club",
    user: "root",
    password: null,
});

conexion.connect(function (error) {
    if (error) throw error; // recuerda empezar mySQL
    else console.log("Conecto con éxito la base de Datos");
});
conexion.end();

// ************ Set the server to listen ************

const port = process.env.PORT || 3001;
//port es para desplegar el proyecto sin problemas

app.listen(port, () => {
    console.log("Server running in http://localhost:" + port);
});
