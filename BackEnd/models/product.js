const mongoose = require('mongoose');
const {categorySchema} = require('../models/category');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true, min: 0},
    image: {type: String},
    category: categorySchema,
    dimensions: [{
        weight: {type: Number, required: true},
        format: {type: Number, required: true},
        length: {type: Number, required: true},
        height: {type: Number, requireed: true},
        width: {type: Number, required: true},
        diameter: {type: Number, required: true}
    }]
})

const Product = mongoose.model('Product', productSchema);

async function updateStock(products) {

    var newProducts = [];
    for await (var i of products) {

        // Find product in DB
        const product = await Product.findById(i._id);
        
        // IF quantity is greater than stock, dont process the order and update the stock product
        try{
            if(i.quantity > product.stock) {
                newProducts = [];
                break;
            }}
        
        catch(err) {
            return err
        }

        product.stock = product.stock - i.quantity
        newProducts.push(product);
    }

    newProducts.forEach(async element => {
        await element.save();
    });
   
    return newProducts;
}


module.exports.productSchema = productSchema;
module.exports.Product = Product;
module.exports.updateStock = updateStock;
