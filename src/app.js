const express = require('express');

const path = require ('path');

const app = express ();

app.use(express.static(path.resolve(__dirname,'../public')));

//funciones para resumir código, que crean rutas con el método post y get. Básicamente hago:
// app.get('/', (req, res) => {
//    res.sendFile(path.resolve(__dirname, './views/home.html'));
// })
let appGet = (ruta, html) => app.get(ruta, (req, res) => res.sendFile(path.join(__dirname, html)));
let appPost = (ruta, html) => app.post(ruta, (req, res) => res.sendFile(path.join(__dirname, html)));

// Recibe como parámetro el nombre de la ruta y dónde busca el archivo
appGet('/', './views/home.html');
appGet('/productos', './views/productos.html');
appPost('/login', './views/login.html');
appPost('/registro', './views/registro.html');
appGet('/carrito-compras', './views/carrito-compras.html');

app.listen(3002, () => {
    console.log('Server running in http://localhost:3002');
});