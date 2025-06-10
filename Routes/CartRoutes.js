const AuthMiddleware = require('../Middlewares/AuthMiddleware')

const RoleMiddleware = require('../Middlewares/RoleMiddleware');


const {addToCart,removeFromCart,updateCartItem,getCart} = require('../Controllers/CartController');

const express = require('express')

const cartrouter = express.Router();

cartrouter.post('/',AuthMiddleware,RoleMiddleware('user'),addToCart);

cartrouter.get('/',AuthMiddleware,RoleMiddleware('user'),getCart);

cartrouter.put('/',AuthMiddleware,RoleMiddleware('user'),updateCartItem);

cartrouter.delete('/',AuthMiddleware,RoleMiddleware('user'),removeFromCart);


module.exports = cartrouter;