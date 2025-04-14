import React from "react";
import { useNavigate } from "react-router-dom";
import "./SponsorSection.css";

const SponsorSection = () => {
  const navigate = useNavigate();

  return (
    <section className="sponsor-section">
      <div className="sponsor-left">
        <h2 className="sponsor-heading">Sponsors</h2>
        <h1 className="sponsor-tagline">
          TOGETHER WE CAN <br /> ACHIEVE GREATNESS
        </h1>
      </div>

      <div className="sponsor-right">
        <p className="sponsor-text">
          Thanks to our sponsors for supporting the activities of the 2024 MISS UNIVERSE<sup>®</sup>.
        </p>

        <div className="sponsor-buttons">
          <button className="view-all-btn">VIEW ALL →</button>
          <button className="become-btn" onClick={() => navigate("/become-a-partner")}>
            BECOME OUR PARTNER →
          </button>
        </div>
      </div>
    </section>
  );
};

export default SponsorSection;
