const Otp = require("../Models/Otp");

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
    await Otp.deleteOne({ email }); // Clean up expired OTP
    return res.status(400).json({ message: "OTP expired" });
  }

  if (record.otp !== userOtp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  await Otp.deleteOne({ email }); // OTP used once only

  return res.status(200).json({ message: "OTP verified successfully" });
};
