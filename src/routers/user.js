const express = require('express');
const router = new express.Router();
const users = require('../controllers/user');
const passport = require('passport');



/* Authentication Routes*/

router.post('/users', users.createUser);
router.post('/users/login', users.login);
router.post('/login', users.loginWithPassport);
router.post('/users/fcmToken', passport.authenticate('jwt', { session: false }), users.createFcmToken);
router.get('/users/me', passport.authenticate('jwt', { session: false }), users.readProfile);
router.put('/users/:id/photo', users.userPhotoUpload);


module.exports = router