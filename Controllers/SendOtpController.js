const {GenerateOTP} = require('../Utils/OtpUtils');

const {sendOTPEmail} = require('../Utils/Mailer');

const Otp = require('../Models/Otp');

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const { otp, expiry } = GenerateOTP();

  try {
    await sendOTPEmail(email, otp);

    // Store in DB
    await Otp.findOneAndUpdate(
      { email },
      { otp, expiry },
      { upsert: true, new: true }
    );

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error sending OTP", error: err });
  }
};
