const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');


app.use(cors());
require('./startup/routes')(app);
const connection = rgitequire('./startup/database')();


app.engine('pug', require('pug').__express)

app.set('views', path.join(__dirname, 'public/static'));
app.set('view engine', 'pug');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(port));

module.exports = server;
