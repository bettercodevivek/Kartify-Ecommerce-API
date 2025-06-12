const Otp = require('../Models/Otp');

const User = require('../Models/UserModel');

exports.verifyOtp = async (req, res) => {
  const { email, otp: userOtp } = req.body;

  if (!email || !userOtp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const record = await Otp.findOne({ email });

  if (!record) {
    return res.status(400).json({ message: "OTP not found, request again" });
  }

  if (record.expiry < Date.now()) {
    await Otp.deleteOne({ email });
    return res.status(400).json({ message: "OTP expired" });
  }

  if (record.otp !== userOtp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  //  OTP matched, update user.isVerified
  const user = await User.findOne({ email });
  if (user) {
    user.isVerified = true;
    await user.save();
  }

  //  Clean up OTP
  await Otp.deleteOne({ email });

  return res.status(200).json({ message: "OTP verified successfully. Account is now verified." });
};
