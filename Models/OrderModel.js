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
        enum:['UPI','COD','NetBanking'],
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

// Some Important Points to understand regarding Schema and model

// when we create a new Schema 'new' keyword is used, but for creation of model 'new' is not used, why :

// mongoose.Schema() is a class , toh jab hum new keyword use karke Schema create karte hai, we are creating an instance of this class
// which basically means an object is being created, jo yeh batata hai ki document ka kya structure rahega when stored in DB
// now this Schema is passed onto mongoose.model() , which is not a class but a factory method , which means ki yaha koi instance nahi
// create ho raha rather model is being defined .
// now when we use this model in other code like handler function to create a new order or new user like this :
// const user = new User({}), yaha actually mein hum ek instance create kar rahe hai hamare model ka.

// so internally what happens in mongoose : 

// Tumhare schema ko register karta hai, model define karta hai

// Ek class generate karta hai (model class)

// Usse MongoDB collection se bind karta hai

// Aur ek Model class return karta hai, ready to be used like:

// Schema is an object, which is passed onto model and after model is defined ,
//  a model class is generated which can be used to create its instances.