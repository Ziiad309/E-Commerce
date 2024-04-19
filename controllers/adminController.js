const adminModel = require('../models/admin')
const Product = require('../models/product')
const order = require('../models/order')

exports.getAllOrders = (req, res) => {
    Product.find()
        .then(products => {
            res.render('user/products', {
                pageTitle: "Products",
                prods: products
            })
        })
        .catch(err => {
            console.log(`this is an error`, err)
        })
};

exports.getMyProducts = (req, res) => {
    const prodId = req.params.prodId
    Product.findById(prodId)
        .then(product => {
            res.render('user/product', {
                prods: product
            })
        }).catch(err => {
            console.log(`this is an error`, err)
        })
};

exports.updateProduct = (req, res) => {
    const prodId = req.params.prodId
    const {title, description, price, image} = req.body
    Product.findById(prodId)
        .then(product => {
            product.title = title,
            product.description = description,
            product.price = price,
            product.image = image
        })
        .catch(err => {
            console.log(err)
        })
};

exports.deleteProduct = (req, res) => {
    const prodId = req.params.prodId;

    Product.findByIdAndDelete(prodId)
        .then(deletedProduct => {
            if (!deletedProduct) {
                return res.status(404).send('Product not found');
            }
            console.log('Product deleted successfully:', deletedProduct);
            res.status(200).send('Product deleted successfully');
        })
        .catch(err => {
            console.error('Error deleting product:', err);
            res.status(500).send('Error deleting product');
        });
};

exports.getAddProduct = (req, res) => {
    res.render('admin/addProduct', {
        pageTitle: "Add Product"
    })
};

exports.postAddProduct = (req, res) => {
    const {title, description, price, image} = req.body
    console.log(req.body)
    const newProduct = new Product({
        name: title,
        description: description,
        price: price,
        imageURL: image
    })

    newProduct.save()
        .then(product => {
            console.log('added successfully')
            res.redirect('home')
        })
        .catch(err => {
            console.log(`sth went wrong`, err)
        })
};

exports.getLogin = (req, res) => {

};

exports.postLogin = (req, res) => {

};

exports.signUp = (req, res) => {
    
};
