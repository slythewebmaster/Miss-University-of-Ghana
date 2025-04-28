import React from "react";
import { Link } from "react-router-dom";
import "./SponsorSection.css";

const sponsors = [
  { img: "https://i.pinimg.com/736x/a9/b8/cf/a9b8cfc141d44712312fadede1808e91.jpg" },
  { img: "https://i.pinimg.com/736x/14/af/c4/14afc4773353129def6920981239c4eb.jpg" },
  { img: "https://i.pinimg.com/736x/73/91/bc/7391bce1b56552175323f814cd0a28be.jpg" },
  { img: "https://i.pinimg.com/736x/de/c1/32/dec1323ea7ef54e926653b980395eef3.jpg" },
  { img: "https://i.pinimg.com/736x/a6/33/74/a63374b1d1b846c8395c01f8171836b3.jpg" },
  { img: "https://i.pinimg.com/736x/df/e8/61/dfe8613966b25aac023f09acb5394831.jpg" },
  { img: "https://i.pinimg.com/736x/06/45/35/06453596ba5ea7639bbb9525ec0e7d5e.jpg" },
  { img: "https://i.pinimg.com/736x/8b/4f/07/8b4f07f562e4c3c83e10e3f2471a3f5b.jpg" },
];

const SponsorSection = () => {
  return (
    <section className="sponsor-section">
      <div className="sponsor-content">
        <div className="sponsor-left">
          <h2 className="sponsor-heading">Sponsors</h2>
          <h1 className="sponsor-tagline">
            TOGETHER WE CAN <br /> ACHIEVE GREATNESS
          </h1>
          <p className="sponsor-text">
            Thanks to our sponsors for supporting the activities of the 2025 MISS UNIVERSITY OF GHANA<sup>®</sup>.
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
