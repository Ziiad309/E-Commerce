const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/products', userController.getAllProducts);

router.post('/add-to-cart/:prodId', userController.addToCart);

router.get('/orders', userController.getAllOrders);

router.get('/product/:prodId', userController.getProduct);

// router.get('/login',userController.getLogin)

// router.post('/login', userController.login);

// router.get('/sign-up',userController.getSignUp);

// router.post('/sign-up', userController.signUp);


module.exports = router;
