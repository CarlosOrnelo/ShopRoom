const express = require('express');
const home = express.Router();
const { Category } = require('../models/category');
const authLogon = require('../middleware/authLogon');


home.get('/', async (req, res) => {
    
    const categories = await Category.find();

    res.render('home', { categories: categories, user: req.session.user})
});

home.post('/', authLogon, async(req, res) => {

    const categories = await Category.find();

    res.render('home', {categories: categories, user: req.session.user})

})


module.exports = home;