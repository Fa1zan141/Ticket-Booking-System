import  { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles/PayConfirmation.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const PaymentConfirmation = () => {
  const location = useLocation();
  const { eventId, userId } = location.state; // Retrieve eventId and userId
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch event details using the eventId
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/events/${eventId}`);
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch event details. Please try again later.", err);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleNavigation = () => {
    const totalAmount = tickets * (event ? event.price : 0);
    navigate("/CardPayment", { state: { eventId, userId, tickets, totalAmount } });
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
      <div className="hero-section">
        <h1 className="hero-title">{event.name}</h1>
        <div className="hero-event-info">
          <span className="hero-location">{event.location}</span>
          <span className="hero-date">{new Date(event.date).toDateString()}</span>
        </div>
      </div>

      <div className="event-details-container">
        <div className="event-image-container">
          <img
            src={`http://localhost:3000/${event.image}`}
            alt={event.name}
            className="event-image"
          />
        </div>

        <div className="event-info-container">
          <h2 className="event-title">{event.name}</h2>
          <p className="event-price">${event.price}.00</p>
          <div className="ticket-section">
            <label htmlFor="ticket-quantity" className="ticket-label">Number of Tickets</label>
            <input
              type="number"
              id="ticket-quantity"
              value={tickets}
              min="1"
              className="ticket-input"
              onChange={(e) => setTickets(Math.max(1, parseInt(e.target.value)))}
            />
          </div>
          <p className="summary-text">
            Total: {tickets} x ${event.price} = ${tickets * event.price}
          </p>
          <button onClick={handleNavigation} className="confirm-booking-button">
            Confirm Booking
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentConfirmation;
