import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cta">
        <p className="cta-text">Grab Your Tickets Today and Be Part of the Action!</p>
      </div>

      <div className="footer-content">
        <div className="footer-brand">
          <h3>
            <span className="footer-logo">🎄</span> Mellodian Community Park
          </h3>
        </div>

        <div className="footer-links">
          <a href="#events" className="footer-link">Event</a>
          <a href="#contact" className="footer-link">Contact</a>
          <a href="/signin" className="footer-link cta-button">Sign In</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          <p>© 2024, All Rights Reserved</p>
        </div>

        <div className="footer-social">
          <a href="#" className="social-icon">🌐</a>
          <a href="#" className="social-icon">📘</a>
          <a href="#" className="social-icon">🐦</a>
          <a href="#" className="social-icon">📷</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
