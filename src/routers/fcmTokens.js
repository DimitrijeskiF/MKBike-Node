const express = require('express');
const router = new express.Router();
const fcmTokens = require('../controllers/fcmTokens');
const passport = require('passport');
const { authorize } = require('../middleware/admin');


router.post('/fcmTokens',fcmTokens.creteToken);
router.get('/fcmTokens', passport.authenticate('jwt', { session: false }), authorize('admin'), fcmTokens.getTokens);


module.exports = router


