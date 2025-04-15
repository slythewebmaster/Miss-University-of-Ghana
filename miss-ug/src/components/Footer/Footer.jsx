import React from "react";
import './Footer.css';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter, FaTiktok, FaThreads } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column logo-social">
          <h2 className="footer-logo">MISS UNIVERSITY OF GHANA</h2>
          <div className="footer-socials">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaXTwitter /></a>
            <a href="#"><FaTiktok /></a>
            <a href="#"><FaThreads /></a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Pages</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/AboutSection">About</Link></li>
            <li><Link to="/">Register</Link></li>
            <li><Link to="/">Contact</Link></li>
            <li><Link to="/">Legacy</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Partners</h4>
          <ul>
            <li><Link to="/">Our Sponsors</Link></li>
            <li><Link to="/become-a-partner">Become a Partner</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Get in touch</h4>
          <ul>
            <li><Link to="/appearance">Talent Appearance</Link></li>
            <li><Link to="/partnerships">Titleholder and Brand Partnerships</Link></li>
            <li><Link to="/contact">Comments or Questions</Link></li>
            <li><Link to="/travel-info">Travel Information</Link></li>
            <li><Link to="/broadcast">Broadcast Licensing</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-policies">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-use">Terms of Use</Link>
          <Link to="/cookie-policy">Cookie Policy</Link>
        </div>
        <p>&copy; 2025 MISS UNIVERSITY OF GHANA. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
