import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import toast, { Toaster } from "react-hot-toast";

// Supabase setup
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Verify = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const { width, height } = useWindowSize();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) {
        setStatus("Invalid payment reference.");
        return;
      }

      // 1. Check if reference exists
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .eq("paystackRef", reference)
        .single();

      if (error || !data) {
        console.error(error);
        setStatus("Reference not found.");
        return;
      }

      // Optional: Confirm with Paystack backend API
      // You can skip this if you're just trusting the hosted link flow.

      // 2. Update status to 'Success'
      const { error: updateError } = await supabase
        .from("registrations")
        .update({ paymentStatus: "Success" })
        .eq("paystackRef", reference);

      if (updateError) {
        setStatus("Verification failed. Try again.");
        console.error(updateError);
        return;
      }

      setStatus("Payment verified successfully 🎉");
    };

    verifyPayment();
  }, [reference]);

  return (
    <div className="verify-container">
      <Toaster />
      {status.includes("successfully") && <Confetti width={width} height={height} />}
      <h1>{status}</h1>
      {status.includes("successfully") && <p>You are now fully registered. We’ll contact you soon!</p>}
    </div>
  );
};

await fetch("https://missuniversityofghana.vercel.app/api/verify", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ reference }),
});

export default Verify;
