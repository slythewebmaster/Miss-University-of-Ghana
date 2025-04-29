import React, { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { PaystackButton } from "react-paystack";

import "./register.css";

// Initial form structure
const initialFormState = {
  name: "",
  age: "",
  gender: "",
  email: "",
  uniqueIntro: "",
  hall: "",
  program: "",
  inspiration: "",
};

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Register = () => {
  const { width, height } = useWindowSize();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const amountInCedis = 50 * 100;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "This field is required.";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onCaptchaChange = (value) => setCaptchaValid(!!value);

  const handlePaymentSuccess = async (reference) => {
    const { error } = await supabase.from("registrations").insert([
      { ...formData, paymentStatus: "Success", paystackRef: reference },
    ]);
    setLoading(false);
    if (error) {
      console.error(error);
      toast.error("Payment successful, but registration failed.");
    } else {
      toast.success("Registration complete!");
      setSuccess(true);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!captchaValid) {
      toast.error("Please complete the CAPTCHA verification.");
      return;
    }

    setLoading(true);
    // Trigger Paystack payment
    document.getElementById("paystack-button").click();
  };

  const paystackProps = {
    email: formData.email,
    amount: amountInCedis,
    metadata: { name: formData.name },
    publicKey,
    text: "Pay GHS 50 to Register",
    onSuccess: (ref) => handlePaymentSuccess(ref.reference),
    onClose: () => {
      toast.error("Payment was not completed.");
      setLoading(false);
    },
    disabled: loading,
  };

  if (success) {
    return (
      <div className="register-container">
        <Confetti width={width} height={height} numberOfPieces={400} recycle={false} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="title">🎉 Registration Successful!</h1>
          <p>Thank you for registering. We can't wait to see you shine!</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div className="register-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <Toaster />
      <h1 className="title">Beauty Pageant Registration</h1>
      <form onSubmit={handleFormSubmit} className="registration-form">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key}>{formatLabel(key)}</label>
            {renderInput(key, value, handleChange, loading, errors[key])}
            {errors[key] && <small className="error-text">{errors[key]}</small>}
          </div>
        ))}

        <div className="captcha">
          <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} onChange={onCaptchaChange} />
        </div>

        {/* Hidden Paystack Button */}
        <PaystackButton {...paystackProps} id="paystack-button" style={{ display: "none" }} />

        {/* Visible button that triggers validation and payment */}
        <button type="submit" className="pay-button" disabled={loading}>
          {loading ? "Processing..." : "Pay GHS 50 to Register"}
        </button>
      </form>
    </motion.div>
  );
};

const formatLabel = (key) => ({
  name: "What is your name?",
  age: "What is your age?",
  gender: "What is your gender?",
  email: "What is your email address?",
  uniqueIntro: "Introduce yourself. What makes you unique?",
  hall: "Hall of Residence?",
  program: "Program of Study?",
  inspiration: "What inspired you to join?",
}[key] || key);

const renderInput = (key, value, handleChange, disabled, error) => {
  const commonProps = {
    name: key,
    value,
    onChange: handleChange,
    disabled,
    className: error ? "error" : "",
  };

  if (["name", "age", "hall", "program", "email"].includes(key)) {
    const type = key === "age" ? "number" : key === "email" ? "email" : "text";
    return <input type={type} {...commonProps} />;
  } else if (key === "gender") {
    return (
      <select {...commonProps}>
        <option value="">Select Gender</option>
        <option value="Female">Female</option>
        <option value="Non-binary">Non-binary</option>
      </select>
    );
  } else {
    return <textarea {...commonProps} />;
  }
};

export default Register;
