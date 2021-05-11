const express = require('express');
const router = new express.Router();

const fcmTokens = require('../controllers/fcmTokens');


router.post('/fcmTokens', fcmTokens.creteToken);
router.get('/fcmTokens', fcmTokens.getTokens);


module.exports = router


