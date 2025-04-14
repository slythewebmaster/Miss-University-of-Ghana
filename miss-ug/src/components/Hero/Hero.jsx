import React from 'react';
import './Hero.css';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="hero" id="Hero">
      <div className="hero-overlay" />
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="hero-title">Welcome to Miss University of Ghana</h1>
        <p className="hero-subtitle">Celebrating Beauty, Intelligence & Culture</p>
        <p className="hero-subtitle">📅 Audition Date: 20th June 2025</p>
        <p className="hero-subtitle">📍 Venue: University of Ghana</p>
        <a href="#Register" className="btn">Register Now</a>
      </motion.div>
    </div>
  );
};

export default Hero;
