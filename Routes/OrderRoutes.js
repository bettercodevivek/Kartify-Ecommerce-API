const {getMyOrders,placeOrder,} = require('../Controllers/OrderController');

const express = require('express');

const orderRouter = express.Router();

orderRouter.post('/',placeOrder);

orderRouter.get('/',getMyOrders);

modules.export = orderRouter;