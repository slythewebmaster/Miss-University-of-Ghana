import React, { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { PaystackButton } from "react-paystack";

import "./register.css";

// Initialize Supabase
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
  const amountInCedis = 50 * 100; // Paystack expects amount in kobo (GHS * 100)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) newErrors[key] = "This field is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onCaptchaChange = (value) => setCaptchaValid(!!value);

  const handlePaymentSuccess = async (reference) => {
    // After successful payment, save form data to Supabase
    const { error } = await supabase.from("registrations").insert([
      { ...formData, paymentStatus: "Success", paystackRef: reference },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      toast.error("Payment successful, but saving data failed. Please try again.");
    } else {
      toast.success("Payment and registration successful! 🎉");
      setSuccess(true); // Show success page if payment and data save are successful
    }
  };

  const handlePaymentClose = () => {
    toast.error("Payment popup closed.");
    setLoading(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!captchaValid) {
      toast.error("Please complete the CAPTCHA verification.");
      return;
    }
    setLoading(true);
    // Payment will be initiated via PaystackButton
  };

  const componentProps = {
    email: formData.email || "test@example.com",
    amount: amountInCedis,
    metadata: {
      name: formData.name,
    },
    publicKey,
    text: loading ? "Processing Payment..." : "Pay GHS 50 to Complete Registration",
    onSuccess: (reference) => handlePaymentSuccess(reference.reference),
    onClose: handlePaymentClose,
    disabled: loading,
    className: "pay-button",
  };

  if (success) {
    return (
      <div className="register-container">
        <Confetti width={width} height={height} numberOfPieces={400} recycle={false} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="title">🎉 Registration Successful!</h1>
          <p>Thank you for registering. We can't wait to see you shine!</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="register-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Toaster />
      <h1 className="title">Beauty Pageant Registration</h1>
      <form onSubmit={handleFormSubmit} className="registration-form">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label>{formatLabel(key)}</label>
            {renderInput(key, value, handleChange, loading, errors[key])}
            {errors[key] && <small className="error-text">{errors[key]}</small>}
          </div>
        ))}

        <div className="captcha">
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={onCaptchaChange}
          />
        </div>

        <PaystackButton {...componentProps} />
      </form>
    </motion.div>
  );
};

// Initial form state
const initialFormState = {
  name: "",
  age: "",
  gender: "",
  email: "",
  uniqueIntro: "",
  hall: "",
  program: "",
  inspiration: "",
  youthIssue: "",
  beautyDefinition: "",
  confidence: "",
  impactIfWin: "",
  achievement: "",
  balance: "",
  campusChange: "",
  universityExperience: "",
};

// Map label text nicely
const formatLabel = (key) => {
  const map = {
    name: "What is your name?",
    age: "What is your age?",
    gender: "What is your gender?",
    email: "What is your email address?",
    uniqueIntro: "Can you introduce yourself and tell us what makes you unique?",
    hall: "What is your Hall of Residence?",
    program: "What is your Program of Study?",
    inspiration: "What inspired you to join this beauty pageant?",
    youthIssue: "What issue matters most to young people today?",
    beautyDefinition: "How do you define beauty?",
    confidence: "What does confidence mean to you?",
    impactIfWin: "If you win, how would you make a difference?",
    achievement: "What is your biggest achievement in university?",
    balance: "How do you balance academics and personal life?",
    campusChange: "What change would you implement on campus?",
    universityExperience: "How has university shaped you?",
  };
  return map[key] || key;
};

// Render input or textarea or select
const renderInput = (key, value, handleChange, disabled, hasError) => {
  if (["name", "age", "hall", "program", "email"].includes(key)) {
    return (
      <input
        type={key === "age" ? "number" : key === "email" ? "email" : "text"}
        name={key}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={hasError ? "error" : ""}
      />
    );
  } else if (key === "gender") {
    return (
      <select
        name={key}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={hasError ? "error" : ""}
      >
        <option value="">Select Gender</option>
        <option value="Female">Female</option>
        <option value="Non-binary">Non-binary</option>
      </select>
    );
  } else {
    return (
      <textarea
        name={key}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={hasError ? "error" : ""}
      />
    );
  }
};

export default Register;
