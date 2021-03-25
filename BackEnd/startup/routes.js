const express = require('express');
const users = require('../routes/api/users');
const homeApi = require('../routes/api/home');
const categories = require('../routes/api/categories');
const products = require('../routes/api/products');
const orders = require('../routes/api/orders');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const sessionStore = new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions'
});


module.exports = function(app) {
    app.use(express.json());
    app.use(express.urlencoded(({extended: true})));
    app.use(cookieParser());
    app.use(session({
        secret: 'some secret',
        resave: true,
        saveUninitialized: true,
        store: sessionStore,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    }));
    app.use('/api/users', users);
    app.use('/api/', homeApi);
    app.use('/api/categories', categories);
    app.use('/api/products', products);
    app.use('/api/orders', orders);
}

