import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import "./styles/EventDetailsPage.css";
import axios from "axios";

const EventDetailsPage = () => {
  const { id } = useParams(); // Get event ID from URL
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId"); 

  useEffect(() => {
    // Fetch event details based on the event ID
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/events/${id}`);
        setEvent(response.data); // Set the event details
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch event details. Please try again later.", err);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleNavigation = () => {
    navigate("/payment", { state: { eventId: id, userId } }); // Pass eventId and userId
  };

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Navbar />

      <div className="content-section">
        <div className="image-wrapper">
          <img
            src={`http://localhost:3000/${event.image}`}
            alt={event.name}
            className="event-image"
          />
        </div>
        <div className="description-wrapper">
          <h2 className="description-title">{event.name}</h2>
          <div className="ticket-info">
            <span className="ticket-price">${event.price}</span>
            <button onClick={handleNavigation} className="ticket-button">Book Ticket</button>
          </div>
          <p className="description-text">{event.description}</p>
          <p className="event-location"><strong>Location:</strong> {event.location}</p>
          <p className="event-date"><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
          <p className="event-time"><strong>Time:</strong> {event.time}</p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EventDetailsPage;
