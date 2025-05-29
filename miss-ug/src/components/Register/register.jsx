import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";
import "./register.css";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    uniqueIntro: "",
    hall: "",
    program: "",
    inspiration: "",
  });

  const [errors, setErrors] = useState({});
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const validate = () => {
    const err = {};
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) err[key] = "Required";
    }
    if (!photoFile) err["photo"] = "Photo is required.";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!captchaValid) return toast.error("Please complete CAPTCHA.");

    setLoading(true);
    const reference = `MUG-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    // Upload photo to Supabase Storage
    const fileExt = photoFile.name.split(".").pop();
    const filePath = `registrations/${reference}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("pageant-photos")
      .upload(filePath, photoFile);

    if (uploadError) {
      console.error(uploadError);
      toast.error("Photo upload failed.");
      setLoading(false);
      return;
    }

    const { data: publicURLData } = supabase.storage
      .from("pageant-photos")
      .getPublicUrl(filePath);

    const photoUrl = publicURLData.publicUrl;

    const { error } = await supabase.from("registrations").insert([
      {
        ...formData,
        photoUrl,
        formId: reference,
        paymentStatus: "Pending",
        paystackRef: reference,
      },
    ]);

    if (error) {
      console.error(error);
      toast.error("Error saving registration.");
      setLoading(false);
      return;
    }

    toast.success(`Registration complete. Your Form ID: ${reference}`);
    localStorage.setItem("reference", reference);

    const payUrl = `https://paystack.com/pay/4m6zuf1dtq?email=${formData.email}&reference=${reference}`;
    window.location.href = payUrl;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="register-container">
      <Toaster />
      <h2 className="title">Miss University of Ghana Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        {renderFields(formData, handleChange, errors, loading)}
        <div>
          <label>Upload Headshot (JPEG/PNG)</label>
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={loading} />
          {errors["photo"] && <small className="error-text">{errors["photo"]}</small>}
        </div>
        <div className="captcha">
          <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} onChange={() => setCaptchaValid(true)} />
        </div>
        <button type="submit" className="proceed-button" disabled={loading}>
          {loading ? (
            <span className="spinner"></span>
          ) : (
            <>
              Proceed to Pay ₵50 <span>&rarr;</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

const renderFields = (formData, handleChange, errors, disabled) =>
  Object.keys(formData).map((key) => (
    <div key={key}>
      <label>{formatLabel(key)}</label>
      {key === "gender" ? (
        <select name={key} value={formData[key]} onChange={handleChange} disabled={disabled}>
          <option value="">Select</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
        </select>
      ) : key === "uniqueIntro" || key === "inspiration" ? (
        <textarea name={key} value={formData[key]} onChange={handleChange} disabled={disabled} />
      ) : (
        <input
          type={key === "email" ? "email" : key === "age" ? "number" : "text"}
          name={key}
          value={formData[key]}
          onChange={handleChange}
          disabled={disabled}
        />
      )}
      {errors[key] && <small className="error-text">{errors[key]}</small>}
    </div>
  ));

const formatLabel = (key) =>
  ({
    name: "Full Name",
    age: "Age",
    gender: "Gender",
    email: "Email",
    phone: "Phone Number",
    uniqueIntro: "What makes you unique?",
    hall: "Hall of Residence",
    program: "Program of Study",
    inspiration: "Why are you joining?",
  }[key] || key);

export default Register;
