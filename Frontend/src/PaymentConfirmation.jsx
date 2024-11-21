import React, { useState } from "react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import "./styles/PayConfirmation.css";
import { useNavigate } from "react-router-dom";
const PaymentConfirmation = () => {
  const [tickets, setTickets] = useState(6);
  const price = 29;

  const handleTicketChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setTickets(value > 0 ? value : 1);
  };
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/CardPayment"); 
  };

  return (
    <>
      <Navbar />

      <div className="unique-event-container">
        <div className="unique-event-image-section">
          <img
            src="../src/assets/Img1.jpg"
            alt="Christmas Eve Event"
            className="unique-event-image"
          />
        </div>

        <div className="unique-event-info-section">
          <h2 className="unique-event-title">CHRISTMAS EVE</h2>
          <p className="unique-event-price">${price}.00</p>

          <div className="unique-ticket-section">
            <input
              type="number"
              id="ticket-quantity"
              value={tickets}
              min="1"
              className="unique-ticket-input"
              onChange={handleTicketChange}
            />
            <hr />
            <label htmlFor="ticket-quantity" className="unique-ticket-label">
              Number of tickets
            </label>
          </div>

          <div className="unique-summary-section">
            <p className="unique-summary-text">
              Total: {tickets} x ${price} = ${tickets * price}
            </p>
            <hr />
            <p className="unique-summary-text">
              Sub Total: ${tickets * price}
            </p>
          </div>

          <button onClick={handleNavigation} className="unique-confirm-button">Confirm Booking</button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PaymentConfirmation;
