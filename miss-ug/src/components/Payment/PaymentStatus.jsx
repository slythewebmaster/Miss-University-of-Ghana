import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentStatus = params.get("status");
    setStatus(paymentStatus);

    if (paymentStatus === "success") {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 8000); // Confetti lasts 8s
    }
  }, [location]);

  return (
    <div className="status-container">
      {showConfetti && <Confetti />}

      <div className="status-box">
        {status === "success" ? (
          <>
            <h2>🎉 Payment Successful!</h2>
            <p>Thank you for registering for Miss University of Ghana!</p>
            <button onClick={() => navigate("/")}>Go Home</button>
          </>
        ) : (
          <>
            <h2>❌ Payment Failed</h2>
            <p>Something went wrong. Please try again.</p>
            <button onClick={() => navigate("/register")}>Try Again</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;