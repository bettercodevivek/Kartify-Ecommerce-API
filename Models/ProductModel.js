// Here, we will create the Products Schema and from that their model.

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:[0,"price value cannot be negative"]
    },
    stock:{
        type:Number,
        required:true,
        default:1,
        min:[0,"stock value cannot be negative"]
    },
    category:{
        type:String,
        enum:['clothing','footwear','general','technology','daily use','medicinal'],
        default:'general'
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true});

const Product = mongoose.model('Product',ProductSchema);

module.exports = Product ;