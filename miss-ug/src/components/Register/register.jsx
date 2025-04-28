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
  "https://YOUR_SUPABASE_URL.supabase.co", 
  "YOUR_SUPABASE_ANON_KEY"
);

const Register = () => {
  const publicKey = "pk_test_4275159c5bbeb93d066bea957d403d07bc85ea68";
  const amountInCedis = 50 * 100;

  const { width, height } = useWindowSize();

  const [formData, setFormData] = useState({
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
    email: "", // Add email for Paystack fallback
  });

  const [errors, setErrors] = useState({});
  const [showPay, setShowPay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, val]) => {
      if (!val.trim()) {
        newErrors[key] = "This field is required.";
      }
    });
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

    try {
      setLoading(true);
      const { data, error } = await supabase.from("registrations").insert([
        {
          ...formData,
          paymentStatus: "Pending",
        }
      ]);

      if (error) {
        console.error(error);
        toast.error("There was an issue saving your data.");
        setLoading(false);
      } else {
        console.log("Data saved before payment:", data);
        toast.success("Form saved! Proceed to payment.");
        setShowPay(true);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("There was a server error.");
      setLoading(false);
    }
  };

  const handlePayment = () => {
    setLoading(true);
    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: formData.email || "test@example.com",
      amount: amountInCedis,
      currency: "GHS",
      callback: async function (response) {
        setLoading(false);
        try {
          // Update payment info in Supabase
          const { error } = await supabase.from("registrations")
            .update({
              paymentStatus: "Success",
              paystackRef: response.reference,
            })
            .eq('email', formData.email); // Match by email

          if (error) {
            console.error(error);
            toast.error("Payment confirmed but saving failed.");
          } else {
            toast.success("Payment successful! 🎉");
            setSuccess(true);
          }
        } catch (err) {
          console.error(err);
          toast.error("Something went wrong updating payment info.");
        }
      },
      onClose: function () {
        toast.error("Payment popup closed without completing payment.");
        setLoading(false);
      }
    });
    handler.openIframe();
  };

  const onCaptchaChange = (value) => {
    setCaptchaValid(!!value);
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
            {key === "name" || key === "age" || key === "hall" || key === "program" || key === "email" ? (
              <input
                type={key === "age" ? "number" : key === "email" ? "email" : "text"}
                name={key}
                value={value}
                onChange={handleChange}
                disabled={loading}
                className={errors[key] ? "error" : ""}
              />
            ) : key === "gender" ? (
              <select
                name="gender"
                value={value}
                onChange={handleChange}
                disabled={loading}
                className={errors[key] ? "error" : ""}
              >
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            ) : (
              <textarea
                name={key}
                value={value}
                onChange={handleChange}
                disabled={loading}
                className={errors[key] ? "error" : ""}
              />
            )}
            {errors[key] && <small className="error-text">{errors[key]}</small>}
          </div>
        ))}

        <div className="captcha">
          <ReCAPTCHA
            sitekey="6LfphxgrAAAAALitTXc6bvDm6YgpEtg_WisWi-9T"
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

export default Register;
