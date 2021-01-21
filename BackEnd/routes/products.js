const express = require('express');
const productsApp = express.Router();
const {Product} = require('../models/product');
const { Category } = require('../models/category');

productsApp.get('/', async (req, res) => {
    
    const products = await Product.find({stock: {$gt: 0}});
    const categories = await Category.find();
    
    res.render('products', {products: products, categories: categories, user: req.session.user})
})

module.exports = productsApp;