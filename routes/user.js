const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken')

const checkUserRole = (req,res,next) => {
    if(req.user.role !== 'user')
        return res.status(403).json({message: "problem", role: req.user.role})
    next()
}

router.use(authenticateToken)

router.get('/products',checkUserRole, userController.getAllProducts);

router.post('/add-to-cart/:prodId',checkUserRole, userController.addToCart);

router.get('/orders',checkUserRole, userController.getAllOrders);

router.get('/product/:prodId',checkUserRole, userController.getProduct);


module.exports = router;
