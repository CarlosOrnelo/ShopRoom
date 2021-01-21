const express = require('express');
const categories = express.Router();
const { Category } = require('../models/category');
const { Product } = require('../models/product');

categories.get('/:id', async (req, res) => {
    
    const categories = await Category.find();
    const products = await Product.find({"category._id": req.params.id, stock: {$gt: 0}})

    res.render('categories', {categories: categories, products: products, user: req.session.user})
})

module.exports = categories;