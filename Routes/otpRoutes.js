const express = require("express");
const Otprouter = express.Router();
const { sendOtp } = require("../Controllers/SendOtpController");
const { verifyOtp } = require("../Controllers/VerifyOtpController");

Otprouter.post("/send-otp", sendOtp);
Otprouter.post("/verify-otp", verifyOtp);

module.exports = Otprouter;
