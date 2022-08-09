const mongoose = require('mongoose');
require('dotenv').config({path: '../../../.env'});

const DB = process.env.DB;
const connectDB = mongoose.createConnection(
    DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: String,
    hash: String,
    salt: String
});

const User = connectDB.model('User', UserSchema);

module.exports = User;