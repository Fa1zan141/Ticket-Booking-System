import { useEffect, useState } from 'react';
import '../styles/Events.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage

  useEffect(() => {
    // Fetch events data from the API
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/events");
        setEvents(response.data); // Update the state with fetched events
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch events. Please try again later.", err);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleNavigation = (eventId) => {
    navigate("/payment", { state: { eventId, userId } }); // Pass eventId and userId
  };

  const handleEvent = (eventId) => {
    navigate(`/eventdetail/${eventId}`); // Pass event ID to event detail page
  };

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="events-section">
      <h2>Upcoming Events This Week</h2>
      <p>Let us help you create lasting memories and <br /> unforgettable moments.</p>
      <div className="events-card-container">
        {events.map((event) => (
          <div key={event.id} className="events-card" onClick={() => handleEvent(event.id)}>
            <img src={`http://localhost:3000/${event.image}`} alt={event.name} />
            <div className="events-card-price">
              <div id="price">
                <p>{event.location}</p>
                <p>{new Date(event.date).toDateString()}</p>
              </div>
              <h3 className='price'>${event.price}</h3>
            </div>
            <h3 className='charsitmist'>{event.name}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent click event
                handleNavigation(event.id);
              }}
              className="events-button"
            >
              Book Ticket
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Events;
