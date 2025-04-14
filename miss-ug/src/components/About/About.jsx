import React from "react";
import "./About.css";
import img1 from "../../assets/img1.jpeg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";

const About = () => {
  return (
    <div className="about-container">
      <h1>University of Ghana SRC</h1>
      <h2>The Ultimate Beauty Pageant Experience!</h2>

      <section className="about-section">
        <h3>Purpose of the Event</h3>
        <p>
          The SRC and Women's Commission are committed to uplifting and empowering students, especially women, by creating opportunities for growth, leadership, and self-expression. This pageant is designed to:
        </p>
        <ul>
          <li>Empower young women to embrace their beauty, intelligence, and uniqueness.</li>
          <li>Provide a platform for contestants to express their ideas, talents, and aspirations.</li>
          <li>Encourage leadership and advocacy for important social issues.</li>
          <li>Promote unity, culture, and tradition within the University of Ghana.</li>
        </ul>
      </section>

      <section className="about-section">
        <h3>About the Pageant</h3>
        <p>
          This is more than just a beauty contest—it’s a search for a well-rounded individual who embodies confidence, intellect, elegance, and purpose. Contestants will participate in:
        </p>
        <ul>
          <li>Personality and Confidence Showcase – Expressing their values and uniqueness.</li>
          <li>Talent and Skill Display – Highlighting creativity and gifts.</li>
          <li>Question & Answer Round – Engaging in thought-provoking discussions.</li>
          <li>Final Crowning – The selection of a queen to represent the university with pride.</li>
        </ul>
      </section>

      <div className="about-images">
        <div className="image-wrapper">
          <img src={img1} alt="Event Highlight 1" />
        </div>
        <div className="image-wrapper">
          <img src={img2} alt="Event Highlight 2" />
        </div>
        <div className="image-wrapper">
          <img src={img3} alt="Event Highlight 3" />
        </div>
      </div>

      <div className="cta">
        <p><strong>Register now, answer the challenge questions, and step into the spotlight!</strong></p>
      </div>
    </div>
  );
};

export default About;
