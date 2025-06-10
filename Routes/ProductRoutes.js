const AuthMiddleware = require('../Middlewares/AuthMiddleware')

const RoleMiddleware = require('../Middlewares/RoleMiddleware');

const {CreateProduct,getAllProducts,getProductById,UpdateProduct,DeleteProduct} = require('../Controllers/ProductController');

const express = require('express');

const productrouter = express.Router();

productrouter.post('/create', AuthMiddleware,RoleMiddleware('admin'),CreateProduct);

productrouter.get('/view',AuthMiddleware,getAllProducts);

productrouter.get('/view/:id',AuthMiddleware,getProductById);

productrouter.put('/update/:id',AuthMiddleware,RoleMiddleware('admin'),UpdateProduct);

productrouter.delete('/delete/:id', AuthMiddleware,RoleMiddleware('admin'),DeleteProduct);

module.exports = productrouter;