const mongoose = require('mongoose');

//Assuming each ticket is a new reservation entry
const Reservation = new mongoose.Schema({
    reservation_email: {
        type: String,
        required: true
    },
    auditorium_code: {
        type: String,
        required: true
    },
    row: { //the row of the single ticket
        type: String,
        required: true
    },
    seat: { //the seat of the single ticket
        type: String,
        required: true
    },
    movie_id : { 
        type: mongoose.Schema.Types.ObjectId,  //type _id
        ref: 'Movie',  //reference model Movie
        required: true
    },
    reservation_dt: {
        type: String,
        default: null
    },
    create_dt: {
        type: String,
        default: null
    },
    update_dt: {
        type: String,
        default: null
    },
    inactive: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Reservation', Reservation);