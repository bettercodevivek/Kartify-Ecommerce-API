const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            quantity:{
                type:Number,
                min:1,
                required:true
            },
            priceAtAddition:{
                type:Number,
                required:true
            }
        }
    ],
    totalPrice:{
        type:Number,
        required:true,
        default:0
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});

const Cart = mongoose.model('Cart',CartSchema);

module.exports = Cart;