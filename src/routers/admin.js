const express = require('express');
const router = new express.Router();

const {
    getUsers,
    createUser,
    deleteUser
} = require('../controllers/admin')

const passport = require('passport');
const { authorize } = require('../middleware/admin');

router.use(passport.authenticate('jwt', { session: false }),)
router.use(authorize('admin'));


router.post('/admin', createUser);
router.get('/admin', getUsers)
router.delete('/admin/:id', deleteUser);

module.exports = router





