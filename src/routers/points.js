const express = require('express');
const points = require('../controllers/points')
const router = express.Router();

router.get('/points', points.getPoints);
router.post('/points', points.addPoint);


module.exports = router;