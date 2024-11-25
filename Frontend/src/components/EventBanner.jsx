import React from "react";
import "../styles/EventBanner.css";

const EventBanner = () => {
  return (
    <section className="event-banner">
      <h1 className="event-title">CHRISTMAS EVE</h1>
      <div className="event-info">
        <span className="location">Marina Bay Sands</span>
        <span className="date">27-05-2024</span>
      </div>
    </section>
  );
};

export default EventBanner;
