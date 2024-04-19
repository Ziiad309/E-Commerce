const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    admin_id: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
});

module.exports = mongoose.model('Order', orderSchema);
