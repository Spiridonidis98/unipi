const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.route('/login')
.post(controller.login);

router.route('/signin')
.post(controller.signIn);
module.exports = router;