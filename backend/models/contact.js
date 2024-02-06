const mongoose = require('mongoose');

const Contact = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    create_dt: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Contact', Contact);