const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    user: {
        _id: {type: String, required: true},
        name: {type: String, required: true, minlength: 5, maxlength: 50},
        email: {type: mongoose.SchemaTypes.Email}
    },
    products: [{
        _id: {type: String},
        name: {type: String},
        price: {type: Number},
        stock: {type: Number},
        image: {type: String},
        category: {type: Object},
        dimensions: {type: Array},
        quantity: {type: Number}
    }],
    date: {type: Date, default: Date.now},
    cost: {type: Number, required: true},
    address: {type: String, required: true, maxlength: 255}
});

const Order = mongoose.model('Order', orderSchema);


module.exports.Order = Order;
