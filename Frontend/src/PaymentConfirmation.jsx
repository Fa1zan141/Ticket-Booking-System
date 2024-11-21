import React, { useState } from "react";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import "./styles/PayConfirmation.css"

const PaymentConfirmation = () => {

    const [tickets, setTickets] = useState(6); 
    const price = 29; 
  
    const handleTicketChange = (event) => {
      const value = parseInt(event.target.value, 10);
      setTickets(value > 0 ? value : 1); 
    };

  return (
    <>
        <Navbar></Navbar>
    <div className="event-details-container">
      <div className="event-image-section">
        <img
          src="../src/assets/Img1.jpg"
          alt="Christmas Eve Event"
          className="event-image"
        />
      </div>

      <div className="event-info-section">
        <h2 className="event-title">CHRISTMAS EVE</h2>
        <p className="event-price">${price}.00</p>

        <div className="ticket-section">
        <input
            type="number"
            id="ticket-quantity"
            value={tickets}
            min="1"
            className="ticket-input"
            onChange={handleTicketChange}
          />
          <hr />
          <label htmlFor="ticket-quantity" className="ticket-label">
            Number of tickets
          </label>
        
        </div>

        <div className="summary-section">
          <p className="summary-text">Total: {tickets} x ${price} = ${tickets * price}</p>
          <hr />
          <p className="summary-text">Sub Total: ${tickets * price}</p>
        </div>

        <button className="confirm-button">Confirm Booking</button>
      </div>
    </div>
        <Footer></Footer>
    
    </>
  );
};

export default PaymentConfirmation;
