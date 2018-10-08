const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const UsersSchema = mongoose.Schema({
    local:{
    email: String,
    password: String
    }
});

UsersSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UsersSchema.methods.validPassword = function(password) {    
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Users', UsersSchema);