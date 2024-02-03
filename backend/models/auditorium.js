const mongoose = require('mongoose');

const Auditorium = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    rows: {
        type: Array,
        required: true
    },
    seats: {
        type: Array,
        required: true
    },
    moviesPlaying: {
        type: Array,
        default: null
        //Potentially there could be no movies playing at one time.
    },
    create_dt: {
        type: String,
        default: null
    },
    update_dt: {
        type: String,
        default: null
    },
    imageName: {
        type: String,
        required: true,
    },
    inactive: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Auditorium', Auditorium);