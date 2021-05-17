const express = require('express');
const points = require('../controllers/points')
const router = express.Router();
const passport = require('passport');
const { authorize } = require('../middleware/admin');


router.get('/points', points.getPoints);
router.post('/points', passport.authenticate('jwt', { session: false }), authorize('admin'), points.addPoint);



module.exports = router;