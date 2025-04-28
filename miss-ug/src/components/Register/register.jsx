import React, { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

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
  const [showPay, setShowPay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const amountInCedis = 50 * 100; // Paystack expects amount in *100

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) newErrors[key] = "This field is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!captchaValid) {
      toast.error("Please complete the CAPTCHA verification.");
      return;
    }

    setLoading(true);

    // Start payment process before saving form data to Supabase
    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: formData.email || "test@example.com",
      amount: amountInCedis,
      currency: "GHS",
      callback: async (response) => {
        // After successful payment, save form data to Supabase
        const { error } = await supabase.from("registrations").insert([
          { ...formData, paymentStatus: "Success", paystackRef: response.reference },
        ]);

        setLoading(false);

        if (error) {
          console.error(error);
          toast.error("Payment successful, but saving data failed. Please try again.");
        } else {
          toast.success("Payment and registration successful! 🎉");
          setSuccess(true); // Show success page if payment and data save are successful
        }
      },
      onClose: () => {
        toast.error("Payment popup closed.");
        setLoading(false);
      }
    });

    handler.openIframe();
  };

  const onCaptchaChange = (value) => setCaptchaValid(!!value);

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

        {!showPay ? (
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Saving..." : "Proceed to Payment"}
          </button>
        ) : (
          <button
            type="button"
            className="pay-button"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span> Processing Payment...
              </>
            ) : (
              "Pay GHS 50 to Complete Registration"
            )}
          </button>
        )}
      </form>
    </motion.div>
  );
};

// Initial form state
const initialFormState = {
  name: "",
  age: "",
  gender: "",
  uniqueIntro: "",
  hall: "",
  program: "",
  inspiration: "",
  style: "",
  criticism: "",
  dinnerGuest: "",
  youthIssue: "",
  beautyDefinition: "",
  confidence: "",
  impactIfWin: "",
  achievement: "",
  balance: "",
  campusChange: "",
  universityExperience: "",
  superpower: "",
  email: "",
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
    style: "How would you describe your personal style?",
    criticism: "How do you handle criticism? Share an example.",
    dinnerGuest: "If you could have dinner with anyone, who and why?",
    youthIssue: "What issue matters most to young people today?",
    beautyDefinition: "How do you define beauty?",
    confidence: "What does confidence mean to you?",
    impactIfWin: "If you win, how would you make a difference?",
    achievement: "What is your biggest achievement in university?",
    balance: "How do you balance academics and personal life?",
    campusChange: "What change would you implement on campus?",
    universityExperience: "How has university shaped you?",
    superpower: "If you had a superpower, what would it be?",
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
        <option value="Male">Male</option>
        <option value="Non-binary">Non-binary</option>
        <option value="Prefer not to say">Prefer not to say</option>
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
