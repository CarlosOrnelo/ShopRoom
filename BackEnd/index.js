const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const corsOptions = {
    exposedHeaders: ['x-auth-token', 'x-auth-user'],
};

app.use(cors(corsOptions));
require('./startup/routes')(app);
const connection = require('./startup/database')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(port));

module.exports = server;
