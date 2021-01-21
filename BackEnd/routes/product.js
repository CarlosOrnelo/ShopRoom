const express = require('express');
const product = express.Router();
const { Product } = require('../models/product');
const { Category } = require('../models/category');


product.get('/:id', async(req, res) => {
    
    const categories = await Category.find();
    const product = await Product.findById(req.params.id);

    res.render('product', {product: product, categories: categories, user: req.session.user})
})

product.post('/:id', async(req, res) => {

    return res.redirect(`${req.params.id}`)
})

module.exports = product;