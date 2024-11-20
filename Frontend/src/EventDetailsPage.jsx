import React from "react";
import "./styles/EventDetailsPage.css";
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const EventDetailsPage = () => {
  return (
    <div className="event-details-page">
     <Navbar></Navbar>

     <div className="event-details-container">
      <div className="event-hero">
        <h1 className="event-title">Christmas Eve</h1>
        <div className="event-meta">
          <span className="event-location">Marina Bay Sands</span>
          <span className="event-date">27-05-2024</span>
        </div>
      </div>

      <div className="event-content">
        <div className="event-image-wrapper">
          <img
            src="../src/assets/Img1.jpg"
            alt="Christmas Eve Event"
            className="event-image"
          />
        </div>
        <div className="event-description-wrapper">
          <h2 className="event-heading">Christmas Eve</h2>
          <p className="event-description">
            I am very happy with my experience using this platform to purchase event tickets.
            The ticket purchasing process was very easy and fast, and I was satisfied with the
            responsive customer service. I will definitely use this platform again for my future
            ticket purchases!
          </p>
          <div className="event-action">
            <span className="event-price">$29.00</span>
            <button className="event-button">Book Ticket</button>
          </div>
        </div>
      </div>
    </div>

      <Footer></Footer>
    </div>
  );
};

export default EventDetailsPage;
