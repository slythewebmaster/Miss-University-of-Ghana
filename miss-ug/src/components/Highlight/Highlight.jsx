import React from "react";
import "./Highlight.css";
import { Link } from "react-router-dom";

const Highlights = () => {
  return (
    <section className="highlight-banner">
      <div className="highlight-content">
        <div className="highlight-left">
          <h4 className="highlight-title">Highlight</h4>
          <h1 className="highlight-main">PRESS RELEASE</h1>
          <p className="highlight-date">April 8, 2025</p>
          <button className="highlight-button">PRESS RELEASES</button>
        </div>

        <div className="highlight-center">
          <h2 className="highlight-description">
            MISS UNIVERSITY OF GHANA PRESS <br /> RELEASE
          </h2>
        </div>

        <div className="highlight-right">
          <Link to="/press" className="highlight-readmore">
            READ MORE →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
