const {Signup,Login,RefreshToken} = require('../Controllers/AuthController');
const express = require('express');
const router = express.Router();

router.post('/signup',Signup);

router.post('/login',Login);

router.post('/refresh',RefreshToken);


module.exports = router;