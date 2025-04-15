import React from "react";
import './Footer.css';
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
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Register</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Partners</h4>
          <ul>
            <li><a href="#">Our Sponsors</a></li>
            <li><a href="#">Become a Partner</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Get in touch</h4>
          <ul>
            <li><a href="#">Talent Appearance</a></li>
            <li><a href="#">Titleholder and Brand Partnerships</a></li>
            <li><a href="#">Comments or questions</a></li>
            <li><a href="#">Travel Information</a></li>
            <li><a href="#">Broadcast Licensing</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-policies">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Cookie Policy</a>
        </div>
        <p>&copy; 2025 MISS UNIVERSITY OF GHANA. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
