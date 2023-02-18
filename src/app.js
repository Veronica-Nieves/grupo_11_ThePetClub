// ************ Require's ************
const express = require('express');
const path = require ('path');
const session = require('express-session'); //
const methodOverride = require('method-override');// para poder usar los métodos PUT y DELETE

// ************ express() ************
const app = express ();


// ************ Middlewares ************
app.use(express.static(path.join(__dirname, '../public'))); // Necesario para los archivos estáticos
app.use(express.urlencoded({extended: false})); // para capturar el body de los formularios
app.use(express.json()); // capturar el body de los forms en formato JSON
app.use(methodOverride('_method')); // para poder usar los métodos PUT y DELETE
app.use(session({secret: 'The Pets Club', resave: false, saveUninitialized: true})); // para habilitar las sesiones


// ************ Template Engine ************
app.set('view engine', 'ejs'); // para indicarle que las vistas son de tipo ejs
app.set('views', path.join(__dirname, '/views')); // definimos ubicación de la carpeta views

// ************ Route System require and use() ************
const mainRouter = require('./routes/main.js'); // Rutas main
const productsRouter = require('./routes/products.js'); // Rutas /products
const usersRouter = require('./routes/users.js'); // Rutas /users

app.use('/', mainRouter);
app.use('/products', productsRouter)
app.use('/users', usersRouter)




// ************ Set the server to listen ************
app.listen(3002, () => {
    console.log('Server running in http://localhost:3002');
});