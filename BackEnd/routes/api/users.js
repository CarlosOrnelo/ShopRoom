const express = require('express');
const {User, validateUser} = require('../../models/user');
const users = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { decode } = require('jsonwebtoken');

users.get('/', async(req, res) => {

    const user = await User.findById(req.body.name);

    res.status(200).send(user);
});



users.post('/', async(req, res) => {
    
    const { error } = validateUser(req.body);
    if(error) res.send(error.message);
    
    const user = await new User({name: req.body.name, email: req.body.email, password: req.body.password});
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.status(301).redirect(`/submitted/${user.name}`);

})



module.exports = users;