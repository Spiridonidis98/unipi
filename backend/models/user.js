const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number
    },
    prefix: {
        type: String,
        default: '+30'
    },
    create_dt: {
        type: String,
        default: null
    },
    update_dt: {
        type: String,
        default: null
    },
    roles: {
        type: Array,
        required: true
    },
    type: {
        type: Number, // 1: through our login | 2: Google Login | 3: Facebook Login
        required: true
    },
    googleId: {
        type: String,
        default: null
    },
    facebookId: {
        type: String,
        default: null
    },
    photo: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('User', User);