import  { useEffect, useState } from 'react';
import '../styles/Navbar.css';
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
  }, []);

  const handleNavigation = () => {
    navigate("/signin");
  };

  const handleLogout = () => {
    // Remove token from localStorage and reset state
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/"); // Navigate to Home after logout
  };

  return (
    <nav className="navbar">
      <div className="logo">🌟 Mellodian Community Park</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/event">Event</a></li>
        <li><a href="/Contact-us">Contact</a></li>
      </ul>
      {!isLoggedIn ? (
        <button onClick={handleNavigation} className="sign-in">Sign In</button>
      ) : (
        <button onClick={handleLogout} className="logout">Logout</button>
      )}
    </nav>
  );
}

export default Navbar;
