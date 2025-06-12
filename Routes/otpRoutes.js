const express = require("express");
const router = express.Router();
const { sendOtp } = require("../Controllers/SendOtpController");
const { verifyOtp } = require("../Controllers/VerifyOtpController");

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;
