const express = require('express')
const router = new express.Router();
const prices = require('../controllers/price');
const passport = require('passport');
const { authorize } = require('../middleware/admin');


router.post('/prices', passport.authenticate('jwt', { session: false }), authorize('admin'), prices.createPrice);
router.get('/prices/young', prices.findPricesForYoung);
router.get('/prices/worker', prices.findPricesForWorkers);
router.get('/prices/retiree', prices.findPricesForRetiree);


module.exports = router