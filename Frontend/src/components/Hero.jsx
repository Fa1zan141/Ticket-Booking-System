import React from 'react';
import '../styles/Hero.css';

function Hero() {
  return (
    <section className="hero" id="home">
      <h1>Welcome to the <span>Mellodian <br/> Community Park</span> Christmas Events</h1>
      <div className="hero-images">
        <img src="../src/assets/Img1.jpg" alt="Event 1" />
        <img src="../src/assets/Img2.jpg" alt="Event 2" />
        <img src="../src/assets/Img3.jpg" alt="Event 3" />
      </div>
    </section>
  );
}

export default Hero;
