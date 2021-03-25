const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');

module.exports = async function(req, res, next) {

    if (req.body.logout) {
        req.session.authToken = null;
        req.session.user = null;
        res.clearCookie('cartValues', { path: '/'});
        res.redirect('/login');
    };

    
    const user = await User.findOne({name: req.body.name});
    if(!user) return res.send('Invalid user or password!');

    const hashed = await bcrypt.compare(req.body.password, user.password);
    if(!hashed) return res.send('Invalid user or password!');
    
    const token = user.generateAuthToken();
    const userSliced = _.pick(user, ['_id', 'name', 'email']);

    res.header('x-auth-token', token);
    res.header('x-auth-user', JSON.stringify(userSliced));
    
    next();
}