import React from "react";
import "./LegacySection.css";

const images = [
  "https://i.pinimg.com/736x/27/aa/45/27aa4560b15039dff4887179ee737c18.jpg",
  "https://i.pinimg.com/736x/7c/c2/41/7cc24114ccebff3d5e6ce319698d5fc0.jpg",
  "https://i.pinimg.com/736x/7e/bd/a2/7ebda211d195cfe858b45fd1f7493102.jpg",
  "https://i.pinimg.com/736x/64/da/61/64da613f7738cabb38908da181979f7a.jpg"
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
