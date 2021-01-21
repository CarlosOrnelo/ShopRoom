const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = async function(req, res, next) {

    if (req.body.logout) {
        req.session.authToken = null;
        req.session.user = null;
        res.clearCookie('cartValues', { path: '/'});
        res.redirect('/login');
    };

    
    const user = await User.findOne({name: req.body.name});
    if(!user) res.status(401).send('Invalid user or password!');

    const hashed = await bcrypt.compare(req.body.password, user.password);
    if(!hashed) res.send('Invalid user or password!');

    const token = user.generateAuthToken();

    req.session.authToken = token;
    req.session.user = user.name;
    
    next();
}