const express = require('express');
const authController = require('../controllers/authController');
const tokenController = require('../controllers/tokenController')
const router = express.Router();

router.route('/register')
    .post(authController.registerUser);

router.route('/login')
    .post(authController.loginUser)

router.get('/refresh', tokenController.verifyRefreshJwt)

module.exports = router;