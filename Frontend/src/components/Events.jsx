import React from 'react';
import '../styles/Events.css';

function Events() {
  return (
    <section className="events">
      <h2>Upcoming Events This Week</h2>
      <p>Let us help you create lasting memories and <br /> unforgettable moments.</p>
      <div className="event-cards">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="event-card">
            <img src="../src/assets/Img1.jpg" alt="Event" />
            <div className="event-price">
            <p>Marina Bay Sands</p>
            <p>27 Dec 2024</p>
            <h3>$29.00</h3> 
            </div>
            
            <h3>Christmas Eve</h3>
            <button className='button'>Book Ticket </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Events;
