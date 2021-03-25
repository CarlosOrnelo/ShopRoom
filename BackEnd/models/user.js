const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
require('mongoose-type-email');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 5, maxlength: 50, unique: true},
    email: {type: mongoose.SchemaTypes.Email, unique: true},
    password: {type: String, required: true, minlength: 8, maxlength: 255},
    isAdmin: {type: Boolean, default: false},
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object().keys({
        name: Joi.string().alphanum().min(5).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required()
    });

    const result = schema.validate(user);
    return result;
}


module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.userSchema = userSchema;