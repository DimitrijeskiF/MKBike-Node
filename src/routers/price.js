const express = require('express')
const router = new express.Router();
const prices = require('../controllers/price');


router.post('/prices', prices.createPrice);
router.get('/prices/young', prices.findPricesForYoung);
router.get('/prices/worker', prices.findPricesForWorkers);
router.get('/prices/retiree', prices.findPricesForRetiree);


module.exports = router