const express = require('express');
const products = express.Router();
const { Product } = require('../../models/product');
const { Category } = require('../../models/category');


products.get('/', async(req, res) => {
    
    const product = await Product.find();

    res.send(product)
});

products.get('/:id', async(req, res) => {
    
    const product = await Product.findById(req.params.id);

    res.send(product)
});


products.post('/', async(req, res) => {
    
    
    const category = await Category.findOne({name: req.body.category});
    if(!category) return res.status(400).send('Category does not exist!');

    var product = await Product.find({name: req.body.name});
    if(product[0]) return res.status(400).send('Product already exists!');


    product = new Product({
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        image: req.body.image,
        category: category,
        dimensions: {
            weight: req.body.dimensions.weight,
            format: req.body.dimensions.format,
            length: req.body.dimensions.length,
            height: req.body.dimensions.height,
            width: req.body.dimensions.width,
            diameter: req.body.dimensions.diameter,
        }
    })


    await product.save();
    res.send(product);

})

module.exports = products;