import React from 'react';
import { Link } from 'react-router-dom';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <p>About</p>
        <h1>MISS UNIVERSITY OF GHANA</h1>
      </section>

      <div className="gold-divider"></div>

      <section className="about-section">
        <h2><span>Welcome to Miss UG!</span></h2>
        <p>
          Miss UG is the University of Ghana's premier beauty pageant, showcasing the talent,
          intelligence, and charisma of our female students. For years, we've been empowering
          women to take center stage, build confidence, and develop their skills.
        </p>
      </section>

      <div className="gold-divider"></div>

      <section className="about-section mission">
        <h2><span>Our Mission</span></h2>
        <p>
          To provide a platform for University of Ghana students to express themselves,
          build leadership skills, and inspire others through talent, beauty, and intellect.
        </p>
      </section>

      <div className="gold-divider"></div>

      <section className="about-section values">
        <h2><span>What We Stand For</span></h2>
        <ul>
          <li><strong>Empowerment:</strong> We believe in empowering women to reach their full potential.</li>
          <li><strong>Diversity:</strong> We celebrate the diversity of our university community.</li>
          <li><strong>Excellence:</strong> We strive for excellence in all aspects of our pageant.</li>
        </ul>
      </section>

      <div className="gold-divider"></div>

      <section className="about-section join">
        <h2><span>Join Us!</span></h2>
        <p>
          If you're a talented, confident, and charismatic woman, we invite you to join us on this
          exciting journey. Let's celebrate beauty, brains, and talent together!
        </p>
        <Link to="/Hero">
          <button className="register-btn">Register</button>
        </Link>
      </section>
    </div>
  );
};

export default AboutSection;
