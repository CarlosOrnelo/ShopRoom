const express = require('express');
const homeApi = express.Router();
const authLogon = require('../../middleware/authLogon');

homeApi.post('/', authLogon, async(req, res) => {

    res.send('Sucesfull Login!')

})


module.exports = homeApi;