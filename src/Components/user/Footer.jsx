import React, { useState } from 'react';
import './Footer.css';

import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Welcome</h3>
          <p>Nullam porttitor pharetra ullamcorper.</p>
          <p>Praesent varius erat vitae nibh.</p>
          <p>
            Suspendisse consectetur ipsum augue,<br />
            a varius enim tempus aade varius erat vitae nibh.
          </p>
        </div>

        <div className="footer-column">
          <h3>Connect With Us</h3>
          <p><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></p>
          <p><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></p>
          <p><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></p>
          <p><a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">Whatsapp</a></p>
        </div>

        <div className="footer-column">
          <h3>Useful Link</h3>
          <p><a href="#">Multiple Branches</a></p>
          <p>Take Franchise</p>
          <p>Scheduled Offers</p>
          <p>More Links</p>
        </div>

        <div className="footer-column">
          <h3>Contact Details</h3>
          <p>
            Address: 3548 Columbia Mine Road,<br />
            Wheeling, West Virginia, 26003
          </p>
          <p>Contact: 304-559-3023</p>
          <p>
            Email: <a href="mailto:shopnow@store.com">shopnow@store.com</a><br />
            <a href="mailto:contact@top.com">contact@top.com</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright@2025 | Th Shop Mania | Developed by ThemeHunk</p>
      </div>

      {/* Floating Icons */}
      <div className="floating-icons">
        {isPopupOpen && (
          <div className="popup-icons">
            {/* <div className="icon-circle"><FaShoppingBag /></div>
            <div className="icon-circle"><FaCog /></div> */}
          </div>
        )}
        <div className="scroll-top-button" onClick={togglePopup}>
          <ArrowUp/>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
