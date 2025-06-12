
exports.generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit
  const expiry = Date.now() + 5 * 60 * 1000; 
  return { otp, expiry };
};
