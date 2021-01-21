const express = require('express');
const home = require('../routes/home');
const users = require('../routes/api/users');
const categories = require('../routes/api/categories');
const products = require('../routes/api/products');
const productsApp = require('../routes/products');
const product = require('../routes/product');
const category = require('../routes/categories');
const payment = require('../routes/payment');
const cart = require('../routes/cart');
const login = require('../routes/login');
const checkout = require('../routes/checkout');
const account = require('../routes/account');
const submitted = require('../routes/submitted');
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
    app.use('/', home);
    app.use('/api/users', users);
    app.use('/api/categories', categories);
    app.use('/api/products', products);
    app.use('/products', productsApp);
    app.use('/product', product);
    app.use('/cart', cart);
    app.use('/api/orders', orders);
    app.use('/categories', category);
    app.use('/submitted', submitted);
    app.use('/payment', payment);
    app.use('/checkout', checkout);
    app.use('/account', account);
    app.use('/login', login);
    app.use(express.static('public'))
}

