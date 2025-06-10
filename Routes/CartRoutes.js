const {addToCart,removeFromCart,updateCartItem,getCart} = require('../Controllers/CartController');

const express = require('express')

const cartrouter = express.Router();

cartrouter.post('/',addToCart);

cartrouter.get('/',getCart);

cartrouter.put('/',updateCartItem);

cartrouter.delete('/',removeFromCart);


module.exports = cartrouter;