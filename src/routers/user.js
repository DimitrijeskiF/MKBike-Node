const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const users = require('../controllers/user');
const passport = require('passport');
const User = require('../models/user')



/* Authentication Routes*/

router.post('/users', users.createUser);
router.post('/users/login', users.login);
router.post('/login', users.loginWithPassport);
router.get('/users/me', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user })
});


/*My Profile Routes*/

router.post('/users/me/image',
    passport.authenticate('jwt', { session: false }),
    users.upload.single('pic'),
    users.uploadProfileImage,
    (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    }
)

router.get('/users/:id/image',
    // passport.authenticate('jwt', { session: false }),
    users.getProfilePicture
)

router.delete('/users/me/image',
    passport.authenticate('jwt', { session: false }),
    users.deleteProfilePicture
);



/*Unnecessary Routes*/
router.post('/users/logout', auth, users.logout);
router.post('/users/logoutAll', auth, users.logoutAll);

module.exports = router