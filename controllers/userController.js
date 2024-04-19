const userModel = require('../models/user')
const Product = require('../models/product');
const bcrypt = require('bcrypt');

// exports.getAllProducts = (req, res) => {
//     Product.find()
//     .then(products => {
//         res.render('products', {
//             prods: products,
//             pageTitle: "All Products",
//             path: '/products'
//         })
//     }).catch(err => {
//         console.log(err)
//     })
// };

// exports.addToCart = (req, res) => {

// };

// exports.getAllOrders = (req, res) => {
    
// };

// exports.getProduct = (req, res) => {
//     const prodId = req.params.prodId
//     Product.findById(prodId)
//     .then(product => {
//         console.log(`has been found`, product)
//         res.render('product', {
//             prod: product,
//             pageTitle: "product",
//             path: '/product'
//         })
//     })
// };

// exports.getLogin = (req, res) => {
//     res.render('login', {pageTitle: "Login"})
// };

// exports.login = (req, res) => {
//     const {email, password} = req.body
//     console.log(email, password)
//     res.send("done!")
// };

// exports.getSignUp = (req, res) => {
//     res.render('signup', {pageTitle: "Sign Up"})
// }


exports.getAllProducts = (req, res) => {
    Product.find()
        .then(products => {
            console.log("get the products successfully");
            res.render('user/products', {
                pageTitle: "Products",
                products: products
            });
        }).catch(err => {
            console.log(`couldnt load the products`, err);
            res.status(500).send('Error loading products');
        });
};

exports.addToCart = (req, res) => {
};

exports.getAllOrders = (req, res) => {
    Product.find()
        .then(products => {
            res.render('user/products', {
                pageTitle: "Products",
                products: products
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching products');
        });
};

exports.getProduct = (req, res) => {
};

exports.getLogin = (req, res) => {
    res.render('user/login', {pageTitle: "Login"})
};

exports.login = (req, res) => {
    const {email, password} = req.body
    res.send(req.body)
};