const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservationController');
path = require('path');
const app = express ();
app.use(express.json());

router.route('/')
.get(controller.getAllReservations)
.post(controller.addReservation); //works as both post and patch
//.delete(controller.deletereservations);

router.route('/active')
.get(controller.getActiveReservations);

router.route('/id/:_id')
.get(controller.getReservationById)
.delete(controller.deleteReservation);

router.route('/email/:reservation_email')
.get(controller.getReservationsByEmail);

module.exports = router;
