const express = require('express');
const { toInteger, parseInt } = require('lodash');
const cart = express.Router();
const { Category } = require('../models/category');

cart.get('/', async(req, res) => {

    var valorTotal = 0;
    var quantity = 0;
    var dimensions = {weight: 0, format: 1, length: 0, height: 0, width: 0, diameter: 0}
    const categories = await Category.find();

    var cookies = [];
    if (req.cookies.cartValues){
        cookies = req.cookies.cartValues}

    cookies.forEach(element => {
        var newElement = JSON.parse(element);
        valorTotal = valorTotal + newElement.price * newElement.quantidade;
        quantity = parseInt(quantity) + newElement.quantidade 
        dimensions.weight = dimensions.weight + JSON.parse(element).dimensions[0].weight * newElement.quantidade;
        dimensions.length = dimensions.length + JSON.parse(element).dimensions[0].length;
        dimensions.height = dimensions.height + JSON.parse(element).dimensions[0].height * newElement.quantidade;
        dimensions.width = dimensions.width + JSON.parse(element).dimensions[0].width * newElement.quantidade;
        dimensions.diameter = dimensions.diameter + JSON.parse(element).dimensions[0].diameter * newElement.quantidade;
    });


    res.render('cart', {categories: categories, cookies: cookies, valorTotal: valorTotal, dimensions: dimensions, quantity: quantity, user: req.session.user})
})

cart.post('/', async(req, res) => {
    
    var check = undefined;
    var quantity = 0;
    var valorTotal = 0;
    var dimensions = {weight: 0, format: 0, length: 0, height: 0, width: 0, diameter: 0}
    var actualCookies = [];
    var novoProduto = JSON.parse(req.body.buyValue);
    novoProduto['quantidade'] = req.body.quantidade
    novoProduto = JSON.stringify(novoProduto);

    if (req.cookies.cartValues) {
        actualCookies = req.cookies.cartValues

        actualCookies.forEach((item, index) => {
            item = JSON.parse(item);
            if(item._id === JSON.parse(novoProduto)._id) {
                item.quantidade = parseInt(item.quantidade, 10) + parseInt(JSON.parse(novoProduto).quantidade, 10);
                actualCookies[index] = JSON.stringify(item);
                check = true;
            }
        })
    };
    

    if(!check)
        actualCookies.push(novoProduto);    

    
    actualCookies.forEach(element => {
        var newElement = JSON.parse(element);
        valorTotal = valorTotal + newElement.price * newElement.quantidade;
        quantity = toInteger(quantity) + toInteger(newElement.quantidade); 
        dimensions.weight = dimensions.weight + newElement.dimensions[0].weight;
        dimensions.length = dimensions.length + newElement.dimensions[0].length;
        dimensions.height = dimensions.height + newElement.dimensions[0].height;
        dimensions.width = dimensions.width + newElement.dimensions[0].width;
        dimensions.diameter = dimensions.diameter + newElement.dimensions[0].diameter;
        console.log(dimensions);
        console.log(newElement);
    });

    const categories = await Category.find();

    res.cookie('cartValues', actualCookies, {maxAge: 1000*60*10, path: '/', secure: false}).render('cart', {cookies: actualCookies, categories: categories, valorTotal: valorTotal, dimensions: dimensions, quantity: quantity, user: req.session.user})
})

module.exports = cart;