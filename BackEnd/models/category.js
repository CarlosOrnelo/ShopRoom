const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    name: {type: String}
})

const Category = mongoose.model('Category', categorySchema);


function validateCategory(category) {
    const schema = Joi.object().keys({
        name: Joi.string().min(1).required()
    });

    const result = schema.validate(category);
    return result;
}

module.exports.Category = Category;
module.exports.validateCategory = validateCategory;
module.exports.categorySchema = categorySchema;