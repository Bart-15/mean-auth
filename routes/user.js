const express = require('express');
const router = express.Router();
const {register, login, profile } = require('../controllers/auth')
const passport = require('passport');


// @route    post /register
// @desc     user register
// @access   Public
router.post('/register', register)

// @route    post /login
// @desc     authenticate user
// @access   Public
router.post('/login', login)

// @route    post /profile
// @desc     get current profile
// @access   Private
router.get('/profile', passport.authenticate('jwt', {session:false}), profile)


module.exports = router;