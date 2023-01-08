const express = require('express');
const path = require ('path');
const app = express ();

//app.use(express.static(path.resolve(__dirname,'../public')));
app.use(express.static(path.join(__dirname, '../public'))); 


//funciones para resumir código, que crean rutas con el método post y get. Básicamente hago:
// app.get('/', (req, res) => {
//    res.sendFile(path.resolve(__dirname, './views/home.html'));
// })
let appGet = (ruta, html) => app.get(ruta, (req, res) => res.sendFile(path.join(__dirname, html)));
let appPost = (ruta, html) => app.post(ruta, (req, res) => res.sendFile(path.join(__dirname, html)));

// Recibe como parámetro el nombre de la ruta y dónde busca el archivo
//appGet('/', './views/home.html');
appGet('/productos', './views/productos.html');
appPost('/login', './views/login.html');
appPost('/registro', './views/registro.html');
appGet('/carrito-compras', './views/carrito-compras.html');




/* AQUÍ EMPIEZA LA NUEVA ESTRUCTURA DE CONTROLADORES */
/* cada uno deberá pasar sus archivos e ir eliminado lo de arriba */

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Definimos ubicación de la carpeta views

const mainRouter = require('./routes/main');
const productsRouter = require('./routes/products');

app.use('/', mainRouter);
app.use('/products', productsRouter)



/*--------------------------------------------------------------------*/
app.listen(3002, () => {
    console.log('Server running in http://localhost:3002');
});