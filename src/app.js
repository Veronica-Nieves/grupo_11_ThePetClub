const express = require('express');
const app = express ();

const path = require ('path');


const productsRouter = require ('./routes/products.js');
const usersRouter = require ('./routes/users.js');
const mainRouter = require ('./routes/main.js');

app.use(express.static(path.join(__dirname, '../public'))); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Definimos ubicación de la carpeta views

app.use('/', mainRouter);
app.use('/products', productsRouter)




/*--------------------------------------------------------------------*/
app.listen(3002, () => {
    console.log('Server running in http://localhost:3002');
});