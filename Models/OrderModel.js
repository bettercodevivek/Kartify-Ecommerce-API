// Now we will create OrderSchema and then OrderModel from it 

// So, in a order what fields are there : 
// user - id of person who placed the order
// products - this is an object array, with each object containing 2 keys : product and quantity
// totalValue - sum of all products
// status of order
// payment method used
// isPaid or not 

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    products:[
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
            }
        }
    ],
    totalAmount:{
        type:Number,
        min:0,
        required:true
    },
    paymentMethod:{
        type:String,
        enum:['UPI','COD','Net Banking'],
        default:'COD'
    },
    status:{
        type:String,
        enum:['pending','confirmed','shipped','delivered','canceled'],
        default:'pending'
    },
    isPaid:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const Order = mongoose.model('Order',OrderSchema);

module.exports = Order ;