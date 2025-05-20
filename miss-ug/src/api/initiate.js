// api/initiate.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, reference } = req.body;

  if (!email || !reference) {
    return res.status(400).json({ message: "Missing email or reference" });
  }

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        reference,
        amount: 5000, // 50 GHS = 5000 pesewas
        callback_url: "https://missuniversityofghana.vercel.app/payment-status",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json(response.data.data);
  } catch (error) {
    console.error("Paystack init error:", error.response?.data || error.message);
    return res.status(500).json({ message: "Payment initialization failed" });
  }
}
