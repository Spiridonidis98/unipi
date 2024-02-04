const reservation = require('../models/reservation');
const movie = require('../models/movie');

path = require('path');
exports.getAllReservations = async (req, res) => {
    try {
        let reservationsFound = await reservation.find();
        return res.status(200).json({
            data: reservationsFound,
            status: 200
        })
    }catch( error ) {
        return res.status(500).json({
            data: JSON.stringify(error, null, '\t'),
            status: 500
        })
    }    
}

exports.getActiveReservations = async (req, res) => {
    try {
        let reservationsFound = await reservation.find({inactive: false});
        return res.status(200).json({
            data: reservationsFound,
            status: 200
        })
    }catch( error ) {
        return res.status(500).json({
            data: JSON.stringify(error, null, '\t'),
            status: 500
        })
    }    
}

exports.getReservationsByEmail = async (req, res) => {
    try {
        const reservationsFound = await reservation.find({reservation_email : req.params.reservation_email});
        return res.status(200).json({
            data: reservationsFound,
            status: 200
        })
    }catch( error ) {
        return res.status(500).json({
            data: JSON.stringify(error, null, '\t'),
            status: 500
        })
    }    
}

exports.getReservationById = async (req, res) => {
    try {
        const reservationFound = await reservation.findById(req.params._id);
        return res.status(200).json({
            data: reservationFound,
            status: 200
        })
    }catch( error ) {
        return res.status(500).json({
            data: JSON.stringify(error, null, '\t'),
            status: 500
        })
    }    
}

exports.addReservation = async (req, res) => {
    //const {reservation_email, auditorium_code, row, seat, movie_id, reservation_dt, inactive} = JSON.parse(req.body.data);
    const _id = req.body._id; // id of the reservation entry itself
    const reservation_email = req.body.reservation_email;
    const auditorium_code = req.body.auditorium_code;
    const row = req.body.row;
    const seat = req.body.seat;
    const movie_id = req.body.movie_id;
    const reservation_dt = req.body.reservation_dt;
    const inactive = req.body.inactive;

    if(!reservation_email || !auditorium_code || !row || !seat || !movie_id || !reservation_dt) {
        return res.status(400).json({
            status: 400,
            msg: 'Required data are missing. Check for reservation_email, auditorium_code, row, seat, movie_id'
        });
    }
    else {
        try { //ensures movie_id is a valid id
           await movie.findOne({_id : movie_id});
        }
        catch(error) {
            return res.status(400).json({
                status: 400,
                dmsg: 'Update failed',
                msg: 'movie_id does not correspond to an existing movie.',
            });
        }

        //if we find reservation with the same id we update it
        if(_id) {
            var reservationFound;
            try {
                reservationFound = await reservation.findById(_id)
            } catch (error) {
                return res.status(400).json({
                    status: 400,
                    dmsg: 'Update failed',
                    msg: '_id of reservation does not correspond to an existing reservation.',
                });  
            }
            try {
                await reservation.findOneAndUpdate({_id: _id}, {
                    reservation_email: reservation_email,
                    auditorium_code : auditorium_code,
                    row: row,
                    seat: seat,
                    movie_id: movie_id,
                    reservation_dt : formatDate(reservation_dt), 
                    inactive: inactive,
                    create_dt:  formatDate(reservationFound.create_dt),
                    update_dt: formatDate(new Date())
                });
                return res.status(200).json({
                    status: 200,
                    msg: 'Update completed'
                })
            }catch( error ) {
                return res.status(500).json({
                    status: 500,
                    dmsg: 'Update failed',
                    msg: 'Interval Server error',
                    data: JSON.stringify(error, null, '\t')
                });
            }
        }
        else {
            //create new reservation
            try{
                const newReservation = new reservation({
                    reservation_email: reservation_email,
                    auditorium_code : auditorium_code,
                    row: row,
                    seat: seat,
                    movie_id: movie_id,
                    reservation_dt : formatDate(reservation_dt), 
                    inactive: inactive,
                    create_dt: formatDate(new Date()),
                    update_dt: formatDate(new Date())
                });
                await newReservation.save();
                return res.status(200).json({
                    data: await reservation.findOne({_id: _id}),
                    status: 200,
                    msg: 'Reservation created'
                });
            }catch( error ) {
                return res.status(500).json({
                    status: 500,
                    dmsg: 'Insert failed',
                    msg: 'Interval Server error',
                    data: JSON.stringify(error, null, '\t')
                });
            }
        }
    }
}

//delete all reservations
/*
exports.deleteReservations = async (req, res) => {
    try {
        const reservationsFound = await reservation.deleteMany();
        if (reservationsFound.deletedCount > 0) {
            return res.status(200).json({
                msg: 'reservations deleted successfully',
                status: 200
            });
        }
        else {
            return res.status(404).json({
                msg: 'reservations not found',
                status: 404
            });
        }
    }catch( error ) {
        return res.status(500).json({
            data: JSON.stringify(error, null, '\t'),
            msg: 'reservations delete error',
            status: 500
        });
    }
}
*/

exports.deleteReservation = async (req, res) => {
    try {
        const reservationFound = await reservation.findByIdAndDelete(req.params._id);
              //  const AuditoriumFound = await auditorium.deleteOne({code: req.params.code});

        if (reservationFound) {
            return res.status(200).json({
                msg: 'reservation deleted successfully',
                status: 200
            });
        }
        else {
            return res.status(404).json({
                msg: 'reservation not found',
                status: 404
            });
        }
    }catch( error ) {
        return res.status(500).json({
            data: JSON.stringify(error, null, '\t'),
            msg: 'reservation delete error',
            status: 500
        });
    }
}



function formatDate(date) {
    let day = new Date(date).getDate() < 10 ? '0' + new Date(date).getDate() : new Date(date).getDate();
    let month = new Date(date).getMonth() + 1 < 10 ? '0' + (new Date(date).getMonth() + 1) : new Date(date).getMonth() + 1;
    let year = new Date(date).getFullYear();
    let hour = new Date(date).getHours() < 10 ? '0' + new Date(date).getHours() : new Date(date).getHours();
    let minutes = new Date(date).getMinutes() < 10 ? '0' + new Date(date).getMinutes() : new Date(date).getMinutes();
    let milliseconds = new Date(date).getSeconds() < 10 ? '0' + new Date(date).getSeconds() : new Date(date).getMilliseconds();

    return `${year}-${month}-${day} ${hour}:${minutes}:${milliseconds}`;
}