import React from "react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EventBanner from "./components/EventBanner";
import "./styles/EventDetailsPage.css";
import { useNavigate } from "react-router-dom";


const EventDetailsPage = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/payment");
  };

  return (
    <>
      <Navbar />
      <EventBanner />

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
          <div className="ticket-info">
            <span className="ticket-price">$29.00</span>
            <button onClick={handleNavigation} className="ticket-button">Book Ticket</button>
          </div>
          <p className="description-text">
            I am very happy with my experience using this platform to purchase
            event tickets. The ticket purchasing process was very easy and
            fast, and I was satisfied with the responsive customer service. I
            will definitely use this platform again for my future ticket
            purchases!
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EventDetailsPage;
