import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EventBanner from "./components/EventBanner";
import axios from "axios";
import "./styles/EventDetailsPage.css";

const EventDetailsPage = () => {
  const { id } = useParams();  // Get event ID from the URL
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  // Fetch event details by ID
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvent(response.data); // Store event details in state
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleNavigation = () => {
    navigate("/payment");
  };

  if (!event) {
    return <p>Loading...</p>; // Show loading text while fetching event details
  }

  return (
    <>
      <Navbar />
      <EventBanner />

      <div className="content-section">
        <div className="image-wrapper">
          <img
            src={event.imageUrl || "../src/assets/Img1.jpg"}  // Use event image if available
            alt={event.title}
            className="event-image"
          />
        </div>
        <div className="description-wrapper">
          <h2 className="description-title">{event.title}</h2>
          <div className="ticket-info">
            <span className="ticket-price">${event.price}</span>
            <button onClick={handleNavigation} className="ticket-button">Book Ticket</button>
          </div>
          <p className="description-text">
            {event.description || "No description available."}
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EventDetailsPage;
