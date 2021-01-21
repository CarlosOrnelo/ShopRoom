const express = require('express');
const categories = express.Router();
const {Category, validateCategory} = require('../../models/category');
const auth = require('../../middleware/auth');

categories.get('/', async(req, res) => {
    
    const category = await Category.find()

    res.send(category);
})


categories.post('/', auth, async(req, res) => {
    
    if(!req.user.isAdmin)
    return res.status(401).send('Denied!')

    const {error} = validateCategory(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const repeat = await Category.find({name: req.body.name})
    if (repeat[0]) return res.status(401).send('Category already exist')
    
    const category = await new Category({
        name: req.body.name
    })

    await category.save();

    res.send(category);
})

categories.delete('/:id', auth, async(req, res) => {
    
    if(!req.user.isAdmin)
    return res.status(401).send('Denied')

    const result = await Category.findByIdAndDelete(req.params.id);
    
    res.send(result)

})


module.exports = categories;