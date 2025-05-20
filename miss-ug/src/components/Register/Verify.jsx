import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import Confetti from "react-confetti";
import toast, { Toaster } from "react-hot-toast";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Verify = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference }),
        });

        const data = await res.json();

        if (data.status === "success") {
          const { error } = await supabase
            .from("registrations")
            .update({ paymentStatus: "Paid" })
            .eq("paystackRef", reference);

          if (error) {
            console.error("Supabase update error:", error);
            toast.error("Payment confirmed but failed to update status.");
            setStatus("error");
          } else {
            setStatus("success");
          }
        } else {
          setStatus("failed");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("error");
      }
    };

    if (reference) verifyPayment();
    else setStatus("error");
  }, [reference]);

  return (
    <div className="verify-container">
      <Toaster />
      {status === "verifying" && <h2>Verifying your payment...</h2>}

      {status === "success" && (
        <>
          <Confetti />
          <h2>🎉 Registration Successful!</h2>
          <p>Thank you for registering. We’ve received your payment.</p>
        </>
      )}

      {status === "failed" && (
        <>
          <h2>Payment Not Verified</h2>
          <p>We couldn’t confirm your payment. Please contact support.</p>
        </>
      )}

      {status === "error" && (
        <>
          <h2>Something went wrong</h2>
          <p>Please try again or contact support.</p>
        </>
      )}
    </div>
  );
};

export default Verify;
