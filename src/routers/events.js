const express = require('express');
const router = new express.Router();
const Event = require('../models/Event');
const events = require('../controllers/events');
const passport = require('passport');
const {authorize} = require('../middleware/admin');


router.get('/events', events.getEvents)
router.post('/events', passport.authenticate('jwt', { session: false }), authorize('admin'), events.createEvent);
router.delete('/events/:id', passport.authenticate('jwt', { session: false }), authorize('admin'), events.deleteEvent)

module.exports = router
