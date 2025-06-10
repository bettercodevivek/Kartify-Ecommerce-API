
const {CreateProduct,getAllProducts,getProductById,UpdateProduct,DeleteProduct} = require('../Controllers/ProductController');

const express = require('express');

const productrouter = express.Router();

productrouter.post('/create',CreateProduct);

productrouter.get('/view',getAllProducts);

productrouter.get('/view/:id',getProductById);

productrouter.put('/update/:id',UpdateProduct);

productrouter.delete('/delete/:id',DeleteProduct);

module.exports = productrouter;