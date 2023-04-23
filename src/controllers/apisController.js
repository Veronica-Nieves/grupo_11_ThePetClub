const db = require("../database/models");

const User = db.User;
const UserFA/*UserFindAll*/= User.findAll();

const Product = db.products;
const ProductFA = Product.findAll();

const Category = db.category;
const CategoryFA = Category.findAll();

const Specie = db.species;
const SpecieFA = Specie.findAll();

const controller = {
    index: (req, res) => {
        Promise.all([UserFA, ProductFA]).then(([users, products]) => {
            users = users.map((user) => {
                return {
                    detail: "http://localhost:3002/api/users/" + user.id,
                    avatar: "http://localhost:3002/img/avatars/" + user.avatar,
                };
            });

            products = products.map((product) => {
                return {
                    detail: "http://localhost:3002/api/products/" + product.id,
                    image: "http://localhost:3002/img/productslist/" + product.image,
                };
            });

            res.json({
                apiUsers: {
                    link: "http://localhost:3002/api/users",
                    detailAvatar: users,
                },
                apiProducts: {
                    link: "http://localhost:3002/api/products",
                    detailImage: products,
                },
            });
        });
    },
    users: (req, res) => {
        /* consigna:
api/users
Deberá devolver un objeto literal con la siguiente estructura:
count → cantidad total de usuarios en la base
users → array con la colección de usuarios, cada uno con:
- id
- name
- email
- detail → URL para obtener el detalle. .*/
        UserFA.then((users) => {
            users = users.map((user) => ({
                id: user.id,
                name: user.first_name,
                email: user.email,
                detail: "http://localhost:3002/api/users/" + user.id,
            }));

            res.json({
                count: users.length,
                users: users,
            });
        });
    },
    userDetail: (req, res) => {
        /* consigna:
    api/users/:id
    Deberá devolver un objeto literal con la siguiente estructura:
    - Una propiedad por cada campo en base
    - Una URL para la imagen de perfil (para mostrar la imagen)
    - Sin información sensible (ej: password y categoría).*/
        User.findByPk(req.params.id).then((user) => {
            res.json({
                id: user.id,
                email: user.email,
                userName: user.user_name,
                name: user.first_name,
                lastName: user.last_name,
                avatar: "http://localhost:3002/img/avatars/" + user.avatar,
            });
        });
    },

    products: (req, res) => {
        /* consigna:
    api/products/
    Deberá devolver un objeto literal con la siguiente estructura:
    count → cantidad total de productos en la base
    countByCategory → objeto literal con una propiedad por categoría con el total de productos
    products → array con la colección de productos, cada uno con:
    - id
    - name
    - description
    - un array con principal relación de uno a muchos (ej: categories).
    - detail → URL para obtener el detalle.*/
        Promise.all([ProductFA, CategoryFA, SpecieFA]).then(([products, categories, species]) => {
            let countBC = {};

            products = products.map((product) => {
                let category = categories[product.category_id - 1];
                let categoryName = category.name;
            
                if (countBC[categoryName]) countBC[categoryName]++;
                else countBC[categoryName] = 1;
            
                return {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    relaciones: {
                        category: category,
                        specie: species[product.specie_id - 1],
                    },
                    detail: "http://localhost:3002/api/products/" + product.id,
                };
            });

            res.json({
                count: products.length,
                countByCategory: countBC,
                products
            });
        });
    },

    productDetail: (req, res) => {
        /* consignas:
    Deberá devolver un objeto literal con la siguiente estructura:
    - una propiedad por cada campo en base
    - un array por cada relación de uno a muchos (categories, colors, sizes, etc)
    - Una URL para la imagen del producto (para mostrar la imagen).*/
        Product.findByPk(req.params.id).then((product) => {
            let promiseCategory = Product.findByPk(product.category_id);
            let promiseSpecie = Product.findByPk(product.specie_id);
            
            Promise.all([promiseCategory, promiseSpecie]).then(([category, specie]) => {
                res.json({
                    product,
                    relaciones: {
                        category: category,
                        specie: specie,
                    },
                    image: "http://localhost:3002/img/productslist/" + product.image,
                });
            });
        });
    },
    species: (req, res) => {
        Promise.all([ProductFA, SpecieFA]).then(([products, species]) => {
            let countBS = {};

            products.forEach((product) => {
                let specie = species[product.specie_id - 1];
                let specieName = specie.name;
            
                if (countBS[specieName]) countBS[specieName]++;
                else countBS[specieName] = 1;
            })

            res.json({
                count: species.length,
                countBySpecie: countBS,
                species
            });
        })

    }
};

module.exports = controller;
