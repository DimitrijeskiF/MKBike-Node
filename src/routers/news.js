const express = require('express');
const router = new express.Router();
const news = require('../controllers/news');


router.post('/news', news.createNews);
router.get('/news', news.getNews);


module.exports = router