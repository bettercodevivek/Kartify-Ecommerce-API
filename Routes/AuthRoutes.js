const {Signup,Login,RefreshToken} = require('../Controllers/AuthController');
const express = require('express');
const authrouter = express.Router();

authrouter.post('/signup',Signup);

authrouter.post('/login',Login);

authrouter.get('/refresh',RefreshToken);


module.exports = authrouter;