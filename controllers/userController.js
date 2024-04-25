const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');

exports.getAllProducts = (req, res) => {
    Product.find()
        .then(products => {
            res.json({ success: true, products });
        })
        .catch(err => {
            console.error('Error loading products:', err);
            res.status(500).json({ success: false, error: 'Error loading products' });
        });
};

exports.addToCart = (req, res) => {
    const prodId = req.params.prodId;
    const userId = req.user.id;

    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.status(404).json({ success: false, error: 'Product not found' });
            }
            const newOrder = new Order({
                user_id: userId,
                admin_id: product.admin_id,
                product: prodId,
            });

            return newOrder.save();
        })
        .then(order => {
            return User.findByIdAndUpdate(userId, {
                $pull: { 'cart.items': { productId: prodId } }
            });
        })
        .then(() => {
            res.json({ success: true, message: 'Order placed successfully' });
        })
        .catch(err => {
            console.error('Error placing order:', err);
            res.status(500).json({ success: false, error: `Error placing order: ${err}` });
        });
};

exports.getAllOrders = (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            res.json({ success: true, orders: user.cart.items });
        })
        .catch(err => {
            console.error('Error fetching user orders:', err);
            res.status(500).json({ success: false, error: 'Error fetching user orders' });
        });
};

exports.getProduct = (req, res) => {
    const prodId = req.params.prodId;

    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.status(404).json({ success: false, error: 'Product not found' });
            }

            res.json({ success: true, product });
        })
        .catch(err => {
            console.error('Error fetching product:', err);
            res.status(500).json({ success: false, error: 'Error fetching product' });
        });
};
