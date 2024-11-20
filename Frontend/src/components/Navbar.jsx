import React from 'react';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🌟 Mellodian Community Park</div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#events">Event</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <button className="sign-in">Sign In</button>
    </nav>
  );
}

export default Navbar;
