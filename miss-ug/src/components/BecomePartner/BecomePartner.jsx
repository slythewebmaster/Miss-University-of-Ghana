import React from 'react';
import './BecomePartner.css';

const BecomePartner = () => {
  return (
    <div className="partner-section">
      <h2 className="section-heading">Join Us</h2>
      <h1 className="section-subheading">PARTNER & SPONSOR</h1>

      <form className="partner-form">
        <div className="form-row">
          <input type="text" placeholder="Full Name **must match valid forms of ID" required />
          <input type="text" placeholder="Title" />
        </div>

        <div className="form-row">
          <input type="text" placeholder="Company" />
          <input type="text" placeholder="Country" />
        </div>

        <div className="form-row">
          <input type="email" placeholder="Email*" required />
          <input type="tel" placeholder="Phone Number **with your country code" />
        </div>

        <div className="form-row">
          <input type="text" placeholder="Website / LinkedIn **or other reference" />
          <select>
            <option>Partner Type</option>
            <option>Sponsor</option>
            <option>Partner</option>
          </select>
        </div>

        <textarea placeholder="In a few sentences, please communicate what you are interested in"></textarea>

        <button type="submit" className="submit-btn">
          SUBMIT <span>→</span>
        </button>
      </form>
    </div>
  );
};

export default BecomePartner;
