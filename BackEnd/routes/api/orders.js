const express = require('express');
const orders = express.Router();
const auth = require('../../middleware/auth');
const { Order, getProduct } = require('../../models/order');

orders.get('/', auth, async(req, res) => {
    
    const orders = await Order.find()

    res.send(orders)
})

orders.post('/', auth, async(req, res) => {
    
    const order = await getProduct(req.body.product)
    if (!order) return res.status(400).send('Quantidade maior que o estoque disponível')

    const newOrder = new Order({
        product: order.products,
        cost: order.total
    })
    await newOrder.save();

    res.send(newOrder)
})

module.exports = orders;