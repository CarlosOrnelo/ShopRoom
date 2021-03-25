const express = require('express');
const orders = express.Router();
const auth = require('../../middleware/auth');
const { Order } = require('../../models/order');
const { updateStock } = require('../../models/product');

orders.get('/', async(req, res) => {
    
    const orders = await Order.find()

    res.send(orders)
})

orders.get('/:id', auth, async(req, res) => {
    
    const orders = await Order.find({"user._id": req.params.id})

    res.send(orders)
})

orders.post('/', auth, async(req, res) => {
    
    const updated = await updateStock(req.body.products);
    console.log(updated);
    if (!updated[0]) return res.send('Quantidade maior que o estoque disponível');

    const order = req.body;
    const newOrder = new Order({
        products: order.products,
        cost: order.cost,
        address: order.address,
        user: order.userData
    })
    await newOrder.save();

    res.send(newOrder)
})

module.exports = orders;