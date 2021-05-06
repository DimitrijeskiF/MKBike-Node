const express = require('express');
const router = new express.Router();
const Event = require('../models/Event');
const events = require('../controllers/events');


router.post('/events', events.createEvent);
router.get('/events', events.getEvents)
module.exports = router
