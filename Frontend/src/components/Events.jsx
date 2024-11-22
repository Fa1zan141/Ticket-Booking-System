import React from 'react';
import '../styles/Events.css';
import { useNavigate } from "react-router-dom";

function Events() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/payment");
  };

  return (
    <section className="events-section">
      <h2>Upcoming Events This Week</h2>
      <p>Let us help you create lasting memories and <br /> unforgettable moments.</p>
      <div className="events-card-container">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="events-card">
            <img src="../src/assets/Img1.jpg" alt="Event" />
            <div className="events-card-price">
              <div id="price">
              <p>Marina Bay Sands</p>
              <p>27 Dec 2024</p>
              </div>
              <h3 className='price'>$29.00</h3>
            </div>
            <h3>Christmas Eve</h3>
            <button onClick={handleNavigation} className="events-button">Book Ticket</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Events;
