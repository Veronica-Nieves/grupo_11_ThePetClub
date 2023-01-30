const express = require('express');
const app = express ();
const path = require ('path');

const mainRouter = require ('./routes/main.js');
const productsRouter = require ('./routes/products.js');
const usersRouter = require ('./routes/users.js');
const methodOverride = require('method-override');


app.use(express.static(path.join(__dirname, '../public'))); // Necesario para los archivos estáticos
app.use(express.urlencoded({extended: false})); // para capturar el body de los formularios
app.use(express.json()); // capturar el body de los forms en formato JSON
app.set('view engine', 'ejs'); // para indicarle que las vistas son de tipo ejs
app.set('views', path.join(__dirname, '/views')); // Definimos ubicación de la carpeta views
app.use(methodOverride('_method'));

app.use('/', mainRouter);
app.use('/products', productsRouter)
app.use('/users', usersRouter)




/*--------------------------------------------------------------------*/
app.listen(3002, () => {
    console.log('Server running in http://localhost:3002');
});