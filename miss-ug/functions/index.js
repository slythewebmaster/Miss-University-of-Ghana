const functions = require('firebase-functions');
const axios = require('axios');

exports.verifyCaptcha = functions.https.onRequest(async (req, res) => {
  const token = req.body.token;
  const secretKey = "6LfphxgrAAAAAG85LmEvDKoh8tHHDx8xFLvvi5LQ";

  try {
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    const response = await axios.post(verificationURL);
    const success = response.data.success;

    res.status(200).json({ success });
  } catch (error) {
    console.error("Captcha verification error:", error);
    res.status(500).json({ success: false, error: "Internal error" });
  }
});