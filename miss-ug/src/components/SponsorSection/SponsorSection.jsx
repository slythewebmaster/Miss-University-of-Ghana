import React from "react";
import { Link } from "react-router-dom";
import "./SponsorSection.css";

const sponsors = [
  { img: "https://i.pinimg.com/736x/26/a7/bc/26a7bce315c65ca6aac22dc50a7f9d2f.jpg" },
  { img: "https://i.pinimg.com/736x/cf/56/7e/cf567e10b5a03533207799da995b1954.jpg" },
  { img: "https://i.pinimg.com/736x/08/10/0b/08100b6c37339eefc10a5175de62a42e.jpg" },
  { img: "https://i.pinimg.com/736x/39/72/a2/3972a24854006ceadd4bb970cfb3921b.jpg" },
  { img: "https://i.pinimg.com/736x/14/af/c4/14afc4773353129def6920981239c4eb.jpg" },
  { img: "https://i.pinimg.com/736x/de/c1/32/dec1323ea7ef54e926653b980395eef3.jpg" },
  { img: "https://i.pinimg.com/736x/8b/4f/07/8b4f07f562e4c3c83e10e3f2471a3f5b.jpg" },
  { img: "https://i.pinimg.com/736x/ae/fa/d8/aefad881ad1995e5150c170da5daa666.jpg" },
];

const SponsorSection = () => {
  return (
    <section className="sponsor-section">
      <div className="sponsor-content">
        <div className="sponsor-left">
          <h2 className="sponsor-heading">Partners</h2>
          <h1 className="sponsor-tagline">
            TOGETHER WE CAN <br /> ACHIEVE GREATNESS
          </h1>
          <p className="sponsor-text">
            Thanks to our Partners for supporting the activities of the 2025 MISS UNIVERSITY OF GHANA<sup>®</sup>.
          </p>
          <div className="sponsor-buttons">
            <button className="view-all-btn">VIEW ALL →</button>
            <Link to="/become-a-partner">
              <button className="become-btn">BECOME OUR PARTNER →</button>
            </Link>
          </div>
        </div>

        <div className="sponsor-logo-grid">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="sponsor-card">
              <img src={sponsor.img} alt={`Sponsor ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorSection;
