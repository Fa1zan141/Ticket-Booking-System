import React, { useState, useEffect } from 'react';
import '../styles/Testimonials.css';

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      text: `"I highly recommend this platform to my friends. I've purchased tickets to events through this platform several times, and each time I've had a great experience."`,
      name: "Cody Fisher",
      role: "Data Scientist",
    },
    {
      text: `"I am very happy with my experience using this platform to purchase event tickets. The ticket purchasing process was very easy and fast, and I was satisfied with the responsive customer service."`,
      name: "Leslie Alexander",
      role: "Content Creator",
    },
    {
      text: `"This was my first time using this platform to purchase event tickets, and I was very impressed with how easy it was. I got tickets at a good price, and the payment process was smooth."`,
      name: "Jacob Jones",
      role: "Student",
    }
    
  ];

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="testimonials">
      <h2>Experience Shared by Our <br /> Customers</h2>
      <p>Let us help you find the events that will create lasting memories <br /> and unforgettable moments.</p>
      <div className="testimonial-slider-wrapper">
        <div
          className="testimonial-slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div className="testimonial" key={index}>
              <p>{testimonial.text}</p>
              <div className="stars">★★★★★</div>
              <h4>{testimonial.name} - {testimonial.role}</h4>
            </div>
          ))}
        </div>
        <div className="dots">
          {testimonials.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
