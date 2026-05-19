const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requrired: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        required: true,
        type: String
    },
    avatar: {
        type: String,
        default: ""
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)