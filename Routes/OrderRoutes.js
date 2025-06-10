const AuthMiddleware = require('../Middlewares/AuthMiddleware')

const RoleMiddleware = require('../Middlewares/RoleMiddleware');

const {getMyOrders,placeOrder,} = require('../Controllers/OrderController');

const express = require('express');

const orderRouter = express.Router();

orderRouter.post('/',AuthMiddleware,RoleMiddleware('user'),placeOrder);

orderRouter.get('/',AuthMiddleware,RoleMiddleware('user'),getMyOrders);

module.exports = orderRouter;