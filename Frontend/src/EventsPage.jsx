import React from "react";
import "./styles/EventsPage.css";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Events from './components/Events'

const EventsPage = () => {
  const events = Array(8).fill({
    title: "Christmas Eve",
    location: "Marina Bay Sands",
    date: "27.05.2024",
    price: "$29.00",
    image: "event-image.jpg", 
  });

  return (
    <div className="events-page">
     <Navbar></Navbar>

      <section className="hero">
        <h1>Events</h1>
      </section>

      <Events></Events>

      <Footer></Footer>
    </div>
  );
};

export default EventsPage;
