const express = require('express');
const checkout = express.Router();
const { Category } = require('../models/category');
const authentication = require('../middleware/authentication');

checkout.post('/', authentication, async(req, res) => {

    var data = '';
    const categories = await Category.find();
    data = {products: req.body.data, valorTotal: req.body.valorCheio};
    
    
    res.render('checkout', {categories: categories, user: req.session.user, products: JSON.parse(data.products), valor: data.valorTotal})

});

module.exports = checkout;