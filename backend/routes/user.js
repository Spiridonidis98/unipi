const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.route('/login')
.post(controller.login);

router.route('/signup')
.post(controller.signup);
module.exports = router;

router.route('/')
.get(controller.getAllUsers);

router.route('/:email')
.get(controller.checkEmailExists)
.delete(controller.deleteUser);