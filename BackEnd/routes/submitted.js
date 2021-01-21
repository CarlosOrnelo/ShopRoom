const express = require('express');
const submitted = express.Router();
const { Category } = require('../models/category');

submitted.get('/:id', async(req, res) => {

    console.log(req.params.id)

    const categories = await Category.find();

    res.render('submitted', { categories: categories, user: req.session.user, name: req.params.id})
});

module.exports = submitted;