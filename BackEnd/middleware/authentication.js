const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../models/user');

module.exports = async function(req, res, next) {
    
    const token = req.session.authToken
    if(!token) res.redirect('/login');

    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));

    next();
}