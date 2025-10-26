import React from "react";
import "./thankyou.scss";

const ThankYouCard = ({ userName, onBackHome }) => {
  return (
    <div className="thankyou-container">
      <div className="thankyou-card">
        <div className="checkmark-container">
          <div className="checkmark">&#10004;</div>
        </div>

        <h2 className="thankyou-title">Thank You, {userName || "Traveler"}!</h2>
        <p className="thankyou-message">
          Your custom tour package has been successfully booked. <br />
          Our travel team will contact you shortly to finalize the details.
        </p>

        <div className="thankyou-footer">
          <p>We can’t wait to make your dream trip a reality 🌍✨</p>
          <button className="home-btn" onClick={onBackHome}>
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouCard;
