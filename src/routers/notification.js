const express = require('express');
const router = new express.Router();
const notifications = require('../controllers/notification')

router.post('/firebase/notification', notifications.sendEventNotification);


module.exports = router;