import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { db } from "../../firebase"; // Import Firestore database
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Import functions for adding data

import "./register.css";

const Register = () => {
  const publicKey = "pk_test_4275159c5bbeb93d066bea957d403d07bc85ea68";
  const amountInCedis = 50 * 100;

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    age: "",
    program: "",
    hall: "",
    inspiration: "",
    style: "",
    dinnerGuest: "",
    youthIssue: "",
    beautyDefinition: "",
    confidence: "",
    impact: "",
    achievement: "",
    balance: "",
    campusChange: "",
    universityExperience: "",
  });

  const [showPay, setShowPay] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return Object.values(formData).every((val) => val.trim() !== "");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill all fields before proceeding to payment.");
      return;
    }
    setShowPay(true);
  };

  const handlePaymentSuccess = async (response) => {
    console.log("Payment successful", response);
    alert("Payment successful! Your registration is complete.");
    
    // Save registration data to Firestore
    try {
      await addDoc(collection(db, "registrations"), {
        ...formData,
        paystackRef: response.reference,
        timestamp: serverTimestamp(),
      });
      alert("Your registration data has been saved successfully!");
    } catch (err) {
      console.error("Error saving registration data: ", err);
      alert("There was an issue saving your data. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h1 className="title">Beauty Pageant Registration</h1>
      <form onSubmit={handleFormSubmit} className="registration-form">
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Full Name:</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />

        <label>Program of Study:</label>
        <input type="text" name="program" value={formData.program} onChange={handleChange} required />

        <label>Hall of Residence:</label>
        <input type="text" name="hall" value={formData.hall} onChange={handleChange} required />

        <label>What inspired you to join this beauty pageant?</label>
        <textarea name="inspiration" value={formData.inspiration} onChange={handleChange} required />

        <label>How would you describe your personal style?</label>
        <textarea name="style" value={formData.style} onChange={handleChange} required />

        <label>If you could have dinner with any historical figure, who would it be and why?</label>
        <textarea name="dinnerGuest" value={formData.dinnerGuest} onChange={handleChange} required />

        <label>What is the most important issue facing young people today?</label>
        <textarea name="youthIssue" value={formData.youthIssue} onChange={handleChange} required />

        <label>How do you define beauty, and how do you embody that definition?</label>
        <textarea name="beautyDefinition" value={formData.beautyDefinition} onChange={handleChange} required />

        <label>What does confidence mean to you, and how do you show it in your daily life?</label>
        <textarea name="confidence" value={formData.confidence} onChange={handleChange} required />

        <label>If you were to win this pageant, how would you use your title to make a difference?</label>
        <textarea name="impact" value={formData.impact} onChange={handleChange} required />

        <label>What is your biggest achievement in university so far?</label>
        <textarea name="achievement" value={formData.achievement} onChange={handleChange} required />

        <label>How do you balance academics, extracurricular activities, and personal life?</label>
        <textarea name="balance" value={formData.balance} onChange={handleChange} required />

        <label>If you could implement one change on campus, what would it be and why?</label>
        <textarea name="campusChange" value={formData.campusChange} onChange={handleChange} required />

        <label>How has your university experience shaped the person you are today?</label>
        <textarea name="universityExperience" value={formData.universityExperience} onChange={handleChange} required />

        {!showPay ? (
          <button type="submit" className="submit-button">Proceed to Payment</button>
        ) : (
          <PaystackButton
            text="Pay GHS 50 to Complete Registration"
            amount={amountInCedis}
            email={formData.email}
            publicKey={publicKey}
            currency="GHS"
            onSuccess={handlePaymentSuccess}
            className="pay-button"
          />
        )}
      </form>
    </div>
  );
};

export default Register;
