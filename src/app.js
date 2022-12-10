const express = require('express');

const path = require ('path');

const app = express ();

app.use(express.static(path.resolve(__dirname,'../public')));

app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname,'./views/home.html'));
})

app.get('/productos', (req,res) => {
    res.sendFile(path.resolve(__dirname,'./views/productos.html'));
})

app.get('/login', (req,res) => {
    res.sendFile(path.resolve(__dirname,'./views/login.html'));
})

app.get('/registro', (req,res) => {
    res.sendFile(path.resolve(__dirname,'./views/registro.html'));
})

app.get('/carrito-compras', (req,res) => {
    res.sendFile(path.resolve(__dirname,'./views/carrito-compras.html'));
})

app.listen(3002, () => {
    console.log('Server running in http://localhost:3002');
});