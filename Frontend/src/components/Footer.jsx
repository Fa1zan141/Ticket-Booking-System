import React from 'react';
import '../styles/Footer.css';
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-section-cta">
        <p className="footer-section-cta-text">Grab Your Tickets Today and Be Part of the Action!</p>
      </div>

      <div className="footer-section-content">
        <div className="footer-section-brand">
          <h3>
            <span className="footer-section-logo">🎄</span> Mellodian Community Park
          </h3>
        </div>

        <div className="footer-section-links">
          <a href="/event" className="footer-section-link">Event</a>
          <a href="/Contact-us" className="footer-section-link">Contact</a>
          <a href="/signin" className="footer-section-link footer-section-cta-button">Sign In</a>
        </div>
      </div>

      <div className="footer-section-bottom">
        <div className="footer-section-copyright">
          <p>© 2024, All Rights Reserved</p>
        </div>

        <div className="footer-section-social">
          <a href="#" className="footer-section-social-icon"><FaFacebook /></a>
          <a href="#" className="footer-section-social-icon"><FaInstagramSquare /></a>
          <a href="#" className="footer-section-social-icon"><FaTwitterSquare /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
