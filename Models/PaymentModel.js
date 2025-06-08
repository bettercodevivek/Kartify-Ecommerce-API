const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
      order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
        required:true
      },
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
      },
      amount:{
        type:Number,
        required:true
      },
      status:{
        type:String,
        enum:['pending','successful','failed'],
        default:'pending'
      },
      mode:{
        type:String,
        enum:['UPI','COD','NetBanking']
      },
      transactionId:{
        type:String
      },
      createdAt:{
        type:Date,
        default:Date.now
      }
});

const Payment = mongoose.model('Payment',PaymentSchema);

module.exports = Payment;