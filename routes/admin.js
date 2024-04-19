const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/orders', adminController.getAllOrders);

router.get('/orders/:adminId', adminController.getMyProducts);

router.patch('/update-product/:prodId', adminController.updateProduct);

router.delete('/delete-product/:prodId', adminController.deleteProduct);

router.get('/add-product', adminController.getAddProduct)

router.post('/add-product', adminController.postAddProduct);

// router.get('/login',adminController.getLogin)

// router.post('/login', adminController.postLogin);

// router.post('/sign-up', adminController.signUp);

module.exports = router;
