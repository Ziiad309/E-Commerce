const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken')

const adminController = require('../controllers/adminController');

const checkAdminRole = (req,res,next) => {
    if(req.user.role !== "admin"){
        return res.status(403).json({message: "unauthorized", role: req.user.role})
    }
    next()
}

router.use(authenticateToken)

router.get('/orders', checkAdminRole,adminController.getAllOrders);

router.get('/orders/:adminId', checkAdminRole,adminController.getMyProducts);

router.patch('/update-product/:prodId', checkAdminRole,adminController.updateProduct);

router.delete('/delete-product/:prodId', checkAdminRole,adminController.deleteProduct);

router.get('/add-product', checkAdminRole,adminController.getAddProduct)

router.post('/add-product', checkAdminRole,adminController.postAddProduct);

module.exports = router;
