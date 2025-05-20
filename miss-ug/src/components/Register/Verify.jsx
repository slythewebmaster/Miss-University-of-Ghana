import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const reference = urlParams.get("reference");
      const formData = localStorage.getItem("mug_registration");

      if (!reference || !formData) {
        navigate("/payment-status?status=failed");
        return;
      }

      try {
        const query = new URLSearchParams({
          reference,
          data: encodeURIComponent(formData),
        });

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/verify?${query}`);
        if (response.redirected) {
          window.location.href = response.url;
        } else {
          const result = await response.json();
          console.log("Verification response:", result);
          navigate("/payment-status?status=failed");
        }
      } catch (error) {
        console.error("Verification failed:", error);
        navigate("/payment-status?status=failed");
      }
    };

    verifyPayment();
  }, [navigate]);

  return <div className="loading">Verifying payment, please wait...</div>;
};

export default Verify;