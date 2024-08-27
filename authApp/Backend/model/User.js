const { timeStamp } = require('console');
const { MongoMissingCredentialsError } = require('../../node_modules/mongodb');
var mongoose = require('../../node_modules/mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('user', userSchema);