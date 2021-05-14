const express = require('express');
const router = new express.Router();
const notifications = require('../controllers/notification');

const passport = require('passport');
const { authorize } = require('../middleware/admin');

router.use(passport.authenticate('jwt', { session: false }),)
router.use(authorize('admin'))


router.post('/firebase/notification', notifications.sendEventNotification);


module.exports = router;