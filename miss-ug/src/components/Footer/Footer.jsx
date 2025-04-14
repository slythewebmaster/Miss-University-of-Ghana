import React, { useState } from "react";
import './Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaCcPaypal, FaApplePay, FaGooglePay, FaBitcoin } from "react-icons/fa";
import { SiAlipay, SiDinersclub, SiJcb } from "react-icons/si";
import { MdSecurity } from "react-icons/md";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Subscribed with ${email}`);
      setEmail("");
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">

        <h2 className="footer-logo">Miss University of Ghana</h2>
        <p className="footer-tagline">Empowering Beauty, Brains & Boldness</p>

        <div className="footer-links">
          <a href="/" target="_blank" rel="noopener noreferrer">Home</a>
          <a href="/register" target="_blank" rel="noopener noreferrer">Register</a>
          <a href="/about" target="_blank" rel="noopener noreferrer">About</a>
        </div>

        <div className="footer-socials">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        </div>

        <div className="newsletter">
          <h4>Join Our Newsletter</h4>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        <div className="payment-section">
          <h4>Payment Options</h4>
          <div className="payment-icons">
            <FaCcVisa title="Visa" />
            <FaCcMastercard title="MasterCard" />
            <FaCcAmex title="American Express" />
            <FaCcDiscover title="Discover" />
            <SiDinersclub title="Diners Club" />
            <SiJcb title="JCB" />
            <FaBitcoin title="Bitcoin" />
            <FaCcPaypal title="PayPal" />
            <FaGooglePay title="Google Pay" />
            <FaApplePay title="Apple Pay" />
            <SiAlipay title="Alipay" />
          </div>
          <p className="security-note">
            <MdSecurity className="lock-icon" /> We protect and save your data securely
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} University of Ghana SRC | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
