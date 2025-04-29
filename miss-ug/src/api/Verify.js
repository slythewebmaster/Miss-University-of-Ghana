// api/verify.js
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { reference } = req.body;

  if (!reference) {
    return res.status(400).json({ message: "Missing reference" });
  }

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = response.data.data;

    if (data.status === "success") {
      const { error } = await supabase
        .from("registrations")
        .update({ paymentStatus: "Success" })
        .eq("paystackRef", reference);

      if (error) {
        return res.status(500).json({ message: "Supabase update failed" });
      }

      return res.status(200).json({ message: "Payment verified and saved." });
    } else {
      return res.status(400).json({ message: "Payment not successful" });
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ message: "Verification failed" });
  }
}
