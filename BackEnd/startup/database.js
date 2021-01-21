const mongoose = require('mongoose');

module.exports = async function() {
    const connection = await mongoose.connect('mongodb://localhost/Shop_Room', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('Conectado');

};