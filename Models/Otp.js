const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
    email:String,
    otp:String,
    expiry:Date
});

const Otp = mongoose.model('Otp',OtpSchema);

module.exports = Otp;