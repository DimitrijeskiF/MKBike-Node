const express = require('express');
const router = new express.Router();
const Event = require('../models/Event');
const events = require('../controllers/events');
const passport = require('passport');
const {authorize} = require('../middleware/admin');

router.use(passport.authenticate('jwt', { session: false }),)
router.use(authorize('admin'))

router.post('/events',events.createEvent);
router.get('/events', events.getEvents)
router.delete('/events/:id', events.deleteEvent)
module.exports = router
