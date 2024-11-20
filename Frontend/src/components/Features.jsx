import React from 'react';
import '../styles/Features.css';

function Features() {
  const features = [
    { icon: '🚛', title: 'Secure Transactions' },
    { icon: '💰', title: 'Best Price Guarantee' },
    { icon: '⏱️', title: 'Real-Time Updates' },
    { icon: '💳', title: 'Flexible Payment' },
  ];

  return (
    <section className="features">
      <div className="features-content">
        <div className="features-text">
          <p>
            At our platform, we believe in offering more than just tickets – we provide an exceptional experience from
            start to finish. Choose us for your event ticketing needs and experience the difference.
          </p>
        </div>
        <div className="features-heading">
          <h2>Discover What Makes Us <br /> the Best Choice</h2>
        </div>
      </div>
      <div className="features-cards">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
