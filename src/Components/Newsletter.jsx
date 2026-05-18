// src/components/Newsletter.jsx
import React from 'react';
import './Newsletter.css';

const Newsletter = () => {
  return (
    <div className="newsletter-container">
      <h2 className="newsletter-title">Stay Updated</h2>
      <p className="newsletter-text">
        Subscribe to our newsletter for the latest offers, <strong>seasonal vegetables</strong>, and health tips.
      </p>
      <div className="newsletter-form">
        <input type="email" placeholder="Enter your email" className="newsletter-input" />
        <button className="newsletter-button">Subscribe</button>
      </div>
    </div>
  );
};

export default Newsletter;
