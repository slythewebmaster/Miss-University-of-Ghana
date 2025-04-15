import React from "react";
import "./About.css";
import { Link } from "react-router-dom";
import img1 from "../../assets/img1.jpeg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";

const About = () => {
  return (
    <div className="about-hero">
      <div className="about-text">
        <h3>About</h3>
        <h1>
          <span className="highlight-blue">WE EMPOWER</span> AND INSPIRE<br />
          <span className="highlight-blue">WOMEN TO SHAPE</span><br />
          A BETTER WORLD
        </h1>
        <p>
          The SRC and Women's Commission are committed to uplifting and empowering students,
          especially women, by creating opportunities for growth, leadership, and self-expression.
          We create a safe platform for women to share their talents, embrace their uniqueness,
          and drive impact both on campus and beyond.
        </p>
        <Link to="/AboutSection">
  <button className="become-btn">EXPLORE →</button>
</Link>
      </div>

      <div className="about-images-column">
        <img src={img1} alt="Community 1" />
        <img src={img2} alt="Community 2" />
        <img src={img3} alt="Community 3" />
      </div>
    </div>
  );
};

export default About;
