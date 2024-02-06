const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactController');
path = require('path');
const app = express ();
app.use(express.json());

router.route('/')
.get(controller.getContacts)
.post(controller.addContact)
.delete(controller.deleteContacts);

router.route('/id/:_id')
.get(controller.getContactById)
.delete(controller.deleteContact);

router.route('/email/:email')
.get(controller.getContactsByEmail);

router.route('/surname/:surname')
.get(controller.getContactsBySurname);

module.exports = router;
