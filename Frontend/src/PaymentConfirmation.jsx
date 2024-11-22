import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles/PayConfirmation.css";
import { useNavigate } from "react-router-dom";

const PaymentConfirmation = () => {
  const [tickets, setTickets] = useState(6);
  const price = 29;
  const navigate = useNavigate();

  const handleTicketChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setTickets(value > 0 ? value : 1);
  };

  const handleNavigation = () => {
    navigate("/CardPayment");
  };

  return (
    <>
      <Navbar />
      <div className="hero-section">
        <h1 className="hero-title">CHRISTMAS EVE</h1>
        <div className="hero-event-info">
          <span className="hero-location">Marina Bay Sands</span>
          <span className="hero-date">27-05-2024</span>
        </div>
      </div>

      <div className="event-details-container">
        <div className="event-image-container">
          <img
            src="../src/assets/Img1.jpg"
            alt="Christmas Eve Event"
            className="event-image"
          />
        </div>

        <div className="event-info-container">
          <h2 className="event-title">CHRISTMAS EVE</h2>
          <p className="event-price">${price}.00</p>
          <input
              type="number"
              id="ticket-quantity"
              value={tickets}
              min="1"
              className="ticket-input"
              onChange={handleTicketChange}
            />
          <hr />

          <div className="ticket-section">
            <label htmlFor="ticket-quantity" className="ticket-label">
              Number of tickets
            </label>
           
          </div>

          <div className="summary-section">
          <p className="summary-text" style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Total</span>
            <span>{tickets} x ${price} = ${tickets * price}</span>
          </p>
          <hr />
          <p className="summary-text" style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Sub Total</span>
            <span>${tickets * price}</span>
          </p>
        </div>

          <button
            onClick={handleNavigation}
            className="confirm-booking-button"
          >
            Confirm Booking
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentConfirmation;
