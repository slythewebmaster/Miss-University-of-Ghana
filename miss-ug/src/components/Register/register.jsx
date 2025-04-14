import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import "./register.css";

const Register = () => {
  const publicKey = "pk_test_4275159c5bbeb93d066bea957d403d07bc85ea68";
  const amountInCedis = 50 * 100;

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
      alert("Please complete the CAPTCHA verification.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "registrations"), {
        ...formData,
        timestamp: serverTimestamp(),
      });

      console.log("Data saved before payment:", docRef.id);
      setShowPay(true);
    } catch (err) {
      console.error("Error saving registration data: ", err);
      alert("There was an issue saving your data. Please try again.");
    }
  };

  const handlePayment = () => {
    setLoading(true);
    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: formData.email || "test@example.com", // fallback
      amount: amountInCedis,
      currency: "GHS",
      callback: async function (response) {
        setLoading(false);
        try {
          await addDoc(collection(db, "registrations"), {
            paystackRef: response.reference,
            paymentStatus: "Success",
            timestamp: serverTimestamp(),
          });
          setSuccess(true);
        } catch (err) {
          console.error("Saving error: ", err);
          alert("There was an error saving your data.");
        }
      },
      onClose: function () {
        alert("Payment popup closed.");
        setLoading(false);
      },
    });
    handler.openIframe();
  };

  const onCaptchaChange = (value) => {
    setCaptchaValid(!!value);
  };

  if (success) {
    return (
      <div className="register-container">
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
      <h1 className="title">Beauty Pageant Registration</h1>
      <form onSubmit={handleFormSubmit} className="registration-form">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label>{formatLabel(key)}</label>
            {key === "name" || key === "age" || key === "hall" || key === "program" ? (
              <input
                type={key === "age" ? "number" : "text"}
                name={key}
                value={value}
                onChange={handleChange}
                className={errors[key] ? "error" : ""}
              />
            ) : key === "gender" ? (
              <select
                name="gender"
                value={value}
                onChange={handleChange}
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
                className={errors[key] ? "error" : ""}
              />
            )}
            {errors[key] && <small className="error-text">{errors[key]}</small>}
          </div>
        ))}

        <div className="captcha">
          <ReCAPTCHA
            sitekey="6LfphxgrAAAAAG85LmEvDKoh8tHHDx8xFLvvi5LQ"
            onChange={onCaptchaChange}
          />
        </div>

        {!showPay ? (
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Validating..." : "Proceed to Payment"}
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
    uniqueIntro: "Can you introduce yourself and tell us what makes you unique?",
    hall: "What is your Hall of Residence?",
    program: "What is your Program of Study?",
    inspiration: "What inspired you to join this beauty pageant?",
    style: "How would you describe your personal style?",
    criticism: "How do you handle criticism, and can you share an example?",
    dinnerGuest: "If you could have dinner with any historical figure, who would it be and why?",
    youthIssue: "What is the most important issue facing young people today?",
    beautyDefinition: "How do you define beauty, and how do you embody that definition?",
    confidence: "What does confidence mean to you, and how do you show it in your daily life?",
    impactIfWin: "If you were to win this pageant, how would you use your title to make a difference?",
    achievement: "What is your biggest achievement in university so far?",
    balance: "How do you balance academics, extracurricular activities, and personal life?",
    campusChange: "If you could implement one change on campus, what would it be and why?",
    universityExperience: "How has your university experience shaped the person you are today?",
    superpower: "If you could have any superpower, what would it be and how would you use it?",
  };
  return map[key] || key;
};

export default Register;
