import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference }),
        });

        const result = await res.json();

        if (res.ok) {
          setStatus("Payment successful. Your registration is confirmed!");
        } else {
          setStatus("Payment not verified. Please contact support.");
        }
      } catch (err) {
        setStatus("An error occurred during verification.");
      }
    };

    if (reference) verifyPayment();
  }, [reference]);

  return (
    <div className="status-page">
      <Toaster />
      <h1>{status}</h1>
    </div>
  );
};

export default PaymentStatus;
