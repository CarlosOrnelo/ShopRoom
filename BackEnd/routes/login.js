const express = require('express');
const login = express.Router();
const { Category } = require('../models/category');

login.get('/', async(req, res) => {

    const message = ''
    const categories = await Category.find();

    res.render('login', { categories: categories, user: req.session.user})

})

module.exports = login;