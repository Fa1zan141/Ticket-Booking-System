import React from 'react';
import '../styles/Testimonials.css';

function Testimonials() {
  return (
    <section className="testimonials">
      <h2>Experience Shared by Our <br /> Customers</h2>
      <p>Let us help you find the events that will create lasting memories <br /> and unforgettable moments.</p>
      <div className="testimonial-slider">
        <div className="testimonial">
          <p>
            "I highly recommend this platform to my friends. I've purchased tickets to events through this platform
            several times, and each time I've had a great experience."
          </p>
          <div className="stars">★★★★★</div>
          <h4>Cody Fisher - Data Scientist</h4>
        </div>
        <div className="testimonial">
          <p>
            "I am very happy with my experience using this platform to purchase event tickets. The ticket purchasing
            process was very easy and fast, and I was satisfied with the responsive customer service."
          </p>
          <div className="stars">★★★★★</div>
          <h4>Leslie Alexander - Content Creator</h4>
        </div>
        <div className="testimonial">
          <p>
            "This was my first time using this platform to purchase event tickets, and I was very impressed with how
            easy it was. I got tickets at a good price, and the payment process was smooth."
          </p>
          <div className="stars">★★★★★</div>
          <h4>Jacob Jones - Student</h4>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
