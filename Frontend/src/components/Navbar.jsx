import React from 'react';
import '../styles/Navbar.css';
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/signin"); 
  };
  return (
    
    <nav className="navbar">
      <div className="logo">🌟 Mellodian Community Park</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/event">Event</a></li>
        <li><a href="/Contact-us">Contact</a></li>
      </ul>
      <button  onClick={handleNavigation} className="sign-in">Sign In</button>
    </nav>
  );
}

export default Navbar;
