const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart:{
        items: [{
            productId: {type: Schema.Types.ObjectId, ref: 'Product'},
            quantitiy: {type: Number, required: true, default: 1}
        }]
    }
})

module.exports = mongoose.model('User', userSchema)