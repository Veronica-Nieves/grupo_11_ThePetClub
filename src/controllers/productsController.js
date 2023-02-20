const fs=require('fs');
const path = require('path');

/* Leemos los datos de productsBBDD.json y lo convertimos a un array*/
const productsFilePath = path.join(__dirname, '../data/productsBBDD.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


/* ------------------------ M É T O D O S ---------------------------*/
/* dentro de la variable controller listamos la lógica de cada método*/
const controller = {

// listado de todos los productos (tambien llamado index)
  list: (req, res) => {
    const productsArray = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    res.render('./products/products-list', {products: productsArray})
	},


// muestra la vista del detalle del producto correpondiente al id pasado en la url
  detail: (req, res) => {
    const productsArray = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    let productoSolicitado = productsArray.find(producto => {
      return producto.id == req.params.id;
    });
    console.log(productoSolicitado)
    res.render('./products/products-detail', {producto: productoSolicitado})
	},


// renderiza el formulario para la carga de un nuevo producto
  create: (req, res) => {
    res.render('./products/products-create');
  },


// procesa los datos enviados en el formulariode crear un nuevo producto
  processCreate: (req, res) => {
    const productsArray = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

    /* Nota: Si el usuario solo selecciona una especie el dato se guarda como string, pero si selecciona dos, se guarda lista. Antes de guardarlo debemos convertirlo SIEMPRE a lista []. Sucede lo mismo con categoría */
    let listSpecie = [];
    let listCategory = [];
    if (typeof req.body.specie === 'string') { listSpecie[0] = req.body.specie } else { listSpecie = req.body.specie};
    if (typeof req.body.category === 'string') { listCategory[0] = req.body.category} else { listCategory = req.body.category};

    let productoNuevo = {
      name:req.body.name,
      id: products[products.length-1].id + 1,
      sku: req.body.sku,
      description:req.body.description,
      image: req.file ? req.file.filename : "product-default-image.jpg",
      price:req.body.price,
      priceOffer: req.body.priceOffer,
      specie: listSpecie,
      category: listCategory,
      offer: req.body.offer,
      featured: req.body.featured,
      pieces: req.body.pieces
      }
    /*agregamos el nuevo producto en el array de productos*/
    productsArray.push(productoNuevo);
    fs.writeFileSync(productsFilePath, JSON.stringify(productsArray, null, " "));
    res.redirect("/products/")
  },





/*EDITAR PRODUCTO*/
  edit: (req, res) => {

    let id = req.params.id
    const productsArray = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    let productToEdit = productsArray.find(producto =>{
      return producto.id == id
    })

    res.render("./products/products-edit", {productToEdit: productToEdit})
  },

  update: (req,res) => {

    const productsArray = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    let id = req.params.id
    let productoGuardado = productsArray.find(producto =>{
      return producto.id == id
    })

    /* Nota: Si el usuario solo selecciona una especie el dato se guarda como string, pero si selecciona dos, se guarda lista. Antes de guardarlo debemos convertirlo SIEMPRE a lista []. Sucede lo mismo con categoría */
    let listSpecie = [];
    let listCategory = [];
    if (typeof req.body.specie === 'string') { listSpecie[0] = req.body.specie } else { listSpecie = req.body.specie};
    if (typeof req.body.category === 'string') { listCategory[0] = req.body.category} else { listCategory = req.body.category};
		

    let productoEditado = {
      name:req.body.name,
      id: productoGuardado.id, // no cambia
      sku: req.body.sku,
      description:req.body.description,
      // falta configurar que pueda subir una nueva aimagen. De momento se deja la anterior
      image: productoGuardado.image,
      price:req.body.price,
      priceOffer: req.body.priceOffer,
      specie: listSpecie,
      category: listCategory,
      offer: req.body.offer,
      featured: req.body.featured,
      pieces: req.body.pieces
      }

    let indice = productsArray.findIndex(product =>{
      return product.id == id
    });
    
    productsArray[indice] = productoEditado;
    fs.writeFileSync(productsFilePath, JSON.stringify(productsArray, null, " "));
    res.redirect("/products/")
  },

  carrito: (req, res) => {
    res.render('carrito-compras');
  }, 

  /* ELIMINAR */
  delete: (req, res) => {
    let id = req.params.id
    const productsArray = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

    let productosActuales = productsArray.filter(producto => {
      return producto.id != id;
    })

    fs.writeFileSync(productsFilePath, JSON.stringify(productosActuales, null, " "));
    res.redirect("/products/");
  },





  
/* ---------------------RUTAS DE USERS-LOGIN ------------------------*/
  
login: (req, res) => {
  return res.render('./users/login')
},

processLogin: (req, res) => {
  /* Leemos los datos de users.json y lo convertimos a un array*/
  const usersFilePath = path.join(__dirname, '../data/users.json');
  const usersArray = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
  // definimos bcrypt para poder usarla pero deberia ir por fuera del controller
  const bcrypt = require('bcryptjs');

  let userToVerify = usersArray.find(user => {
    return user.email == req.body.email
  });
  let verifyErrors = [];

  if(userToVerify == undefined){
    res.send("El usuario no se encuentra resistrado. Intentalo nuevamente. ")
  } 
    
  res.send("Se encontró un usuario");

    let usuarioEditado = {
      id: 1,
      firstName: "Vero",
      lastName: "Nieves",
      nameUser: "veronica",
      email: "v.nievescruz@gmail.com",
      role: "Customer",
      password: bcrypt.hashSync('vero123') ,
      passwordConfirmed: bcrypt.hashSync('vero123') 
    }
  
  usersArray[0] = usuarioEditado;
  fs.writeFileSync(usersFilePath, JSON.stringify(usersArray, null, " "));
  
    

  console.log("to verify", userToVerify);
  console.log("editado", usuarioEditado);


},
/* ------------------FIN RUTAS DE USERS-LOGIN ----------------------*/


}

module.exports = controller;