const mongoose = require('mongoose');

const Screening = new mongoose.Schema({
    movie_id: {
        type: String,
        required: true
    },
    auditorium_id: {
        type: String,
        required: true
    },
    screening_dt: {
        type: String,
        required: true
    },
    movieInfo: {},
    auditoriumInfo: {},
    inactive: {
        type: Boolean,
        default: false
    },
    create_dt: {
        type: String,
    },
    update_dt: {
        type: String
    }
});

module.exports = mongoose.model('Screening', Screening);
