const express = require('express');
const account = express.Router();
const { Category } = require('../models/category');
const { Order } = require('../models/order');

account.get('/', async (req, res) => {

    var orders = '';
    
    const categories = await Category.find();
    orders = await Order.find({'user.name': req.session.user});

    res.render('account', {categories: categories, user: req.session.user, orders: orders})
})

module.exports = account;