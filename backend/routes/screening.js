const express = require('express');
const router = express.Router();
const controller = require('../controllers/screeningController');

router.route('/')
.get(controller.getScreening)
.post(controller.addScreening);


module.exports = router;
