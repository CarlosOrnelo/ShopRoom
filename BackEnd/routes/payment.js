const express = require('express');
const payment = express.Router();
const { Category } = require('../models/category');
const { User } = require('../models/user');
const { Order } = require('../models/order');
const { updateStock } = require('../models/product');


payment.get('/', async(req, res) => {

    const categories = await Category.find();

    res.render('payment', {user: req.session.user, categories: categories})
});

payment.post('/', async(req, res) => {

    var newOrder = '';
    const productsParse = [];
    const categories = await Category.find();

    // Create an Array with products
    JSON.parse(req.body.products).forEach(element => {
        productsParse.push(JSON.parse(element))
    });

    // Getting user name
    const user = await User.find({name: req.session.user});

    const products = await updateStock(JSON.parse(req.body.products));
    if(!products[0]) {res.status(401).send('Estoque indisponível!')};

    console.log(productsParse);

    // Creating an order
    const order = new Order({
        user: user[0],
        products: productsParse,
        cost: req.body.valorTotal,
        address: req.body.address
    })
    
    // Save order on DB, return order to frontEnd and clear shopping cart
    try{
        await order.save();
        newOrder = order._id;
        res.clearCookie('cartValues', { path: '/'});
    }
    catch(err) {
        console.log(err)
    }


    res.render('payment', {user: req.session.user, categories: categories, order: newOrder})
});

module.exports = payment;