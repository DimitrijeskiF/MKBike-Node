const express = require('express');
const router = new express.Router();
const news = require('../controllers/news');

const passport = require('passport');
const { authorize } = require('../middleware/admin');




router.get('/news', news.getNews);
router.post('/news', passport.authenticate('jwt', { session: false }), authorize('admin'), news.createNews);
router.delete('/news/:id', passport.authenticate('jwt', { session: false }), authorize('admin'), news.deleteNews);


module.exports = router