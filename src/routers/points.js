const express = require('express');
const points = require('../controllers/points')
const router = express.Router();
const passport = require('passport');
const { authorize } = require('../middleware/admin');

router.use(passport.authenticate('jwt', { session: false }),)
router.use(authorize('admin'))


router.get('/points', points.getPoints);
router.post('/points', points.addPoint);


module.exports = router;