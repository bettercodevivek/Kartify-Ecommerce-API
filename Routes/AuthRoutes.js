const {Signup,Login,RefreshToken, googleLogin, googleCallback} = require('../Controllers/AuthController');
const express = require('express');
const authrouter = express.Router();

authrouter.post('/signup',Signup);

authrouter.post('/login',Login);

authrouter.get('/refresh',RefreshToken);

authrouter.get('/google',googleLogin);

authrouter.get('/google/callback',googleCallback);


module.exports = authrouter;