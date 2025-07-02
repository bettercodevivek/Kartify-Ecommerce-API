require('dotenv').config();

const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

const cookieparser = require('cookie-parser');

const ConnectDB = require('./Config/db');

const authrouter = require('./Routes/AuthRoutes');

const productrouter = require('./Routes/ProductRoutes');

const orderRouter = require('./Routes/OrderRoutes');

const cartrouter = require('./Routes/CartRoutes');

const Otprouter = require('./Routes/otpRoutes');

ConnectDB();

app.use(express.json());

app.use(cookieparser());

app.use('/api/auth',authrouter);

app.use('/api/otp',Otprouter);

app.use('/api/products',productrouter);

app.use('/api/orders',orderRouter);

app.use('/api/cart',cartrouter);

app.listen(PORT,()=>{
    console.log('Server started successfully !!!')
})