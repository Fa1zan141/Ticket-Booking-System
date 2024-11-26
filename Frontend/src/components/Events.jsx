import React, { useState, useEffect } from 'react';
import '../styles/Events.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Events() {
  const navigate = useNavigate();

  // State to store events data
  const [events, setEvents] = useState([]);

  // Fetch events data from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/events", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data); // Set events data to state
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Handle navigation to event details page
  const handleEvent = (eventId) => {
    navigate(`/eventdetail/${eventId}`); // Navigate to the event detail page using event ID
  };

  // Handle navigation to payment page
  const handleNavigation = () => {
    navigate("/payment");
  };

  return (
    <section className="events-section">
      <h2>Upcoming Events This Week</h2>
      <p>Let us help you create lasting memories and <br /> unforgettable moments.</p>

      {/* Display events dynamically */}
      <div className="events-card-container">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="events-card" onClick={() => handleEvent(event._id)}>
              {/* Display the event image dynamically */}
              <img 
                src={event.imageUrl || "../src/assets/Img1.jpg"}  // Use event image if available, else fallback
                alt={event.image || "Event Image"} 
                className="event-image"
              />
              <div className="events-card-price">
                <div id="price">
                  <p>{event.location}</p>
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                </div>
                <h3 className="price">${event.price}</h3>
              </div>
              <h3 className="charsitmist">{event.name}</h3>
              <button onClick={handleNavigation} className="events-button">Book Ticket</button>
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </section>
  );
}

export default Events;
