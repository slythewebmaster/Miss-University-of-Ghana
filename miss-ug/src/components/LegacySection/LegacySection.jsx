import React from "react";
import "./LegacySection.css";

const images = [
  "https://i.pinimg.com/736x/cb/04/8a/cb048a57eae3877197480e7fd76ad6e6.jpg",
  "https://i.pinimg.com/736x/f1/59/ae/f159aea8712ebea863cc4ed9d1d28a0c.jpg",
  "https://i.pinimg.com/736x/45/f7/81/45f781f47213d828a498f242368d04b4.jpg",
  "https://i.pinimg.com/736x/73/75/60/737560827451931d3580588a5ca4e293.jpg"
];

const LegacySection = () => {
  return (
    <section className="legacy-section">
      <h2 className="legacy-subtitle">First Ever Pageant</h2>
      <h1 className="legacy-title">
        JOIN <span className="gold-text">US</span>
      </h1>
      <h1 className="legacy-bold">MISS UNIVERSITY OF GHANA</h1>
      <a href="#" className="view-all">VIEW ALL →</a>
      <div className="legacy-gallery">
        {images.map((img, idx) => (
          <div className="image-wrapper" key={idx}>
            <img src={img} alt={`Legacy ${idx + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LegacySection;
