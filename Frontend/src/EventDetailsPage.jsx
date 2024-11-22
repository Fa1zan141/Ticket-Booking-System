import React from "react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import "./styles/EventDetailsPage.css";

const EventDetailsPage = () => {
  return (
    <>
      <Navbar />

      <div className="hero-section">
        <h1 className="hero-title">CHRISTMAS EVE</h1>
        <div className="event-info">
          <span className="event-location">Marina Bay Sands</span>
          <span className="event-date">27-05-2024</span>
        </div>
      </div>

      <div className="content-section">
        <div className="image-wrapper">
          <img
            src="../src/assets/Img1.jpg"
            alt="Christmas Eve Event"
            className="event-image"
          />
        </div>
        <div className="description-wrapper">
          <h2 className="description-title">Christmas Eve</h2>
          <p className="description-text">
            I am very happy with my experience using this platform to purchase
            event tickets. The ticket purchasing process was very easy and
            fast, and I was satisfied with the responsive customer service. I
            will definitely use this platform again for my future ticket
            purchases!
          </p>
          <div className="ticket-info">
            <span className="ticket-price">$29.00</span>
            <button className="ticket-button">Book Ticket</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EventDetailsPage;
