const express = require('express');
const router = new express.Router();
const news = require('../controllers/news');

const passport = require('passport');
const { authorize } = require('../middleware/admin');

router.use(passport.authenticate('jwt', { session: false }),)
router.use(authorize('admin'))



router.post('/news', news.createNews);
router.get('/news', news.getNews);
router.delete('/news/:id', news.deleteNews);


module.exports = router