import React from 'react';
import './styles/ContactUs.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
function ContactUs() {
  return (
    <>
    <Navbar></Navbar>
     <div className="contact-container">
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Reach out to us for any inquiries or support.</p>
      </header>

      <div className="contact-content">
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Your Full Name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Your Email Address" required />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="Subject of Your Message" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="6" placeholder="Write Your Message" required></textarea>
            </div>

            <button type="submit" className="form-submit-button">Send Message</button>
          </form>
        </div>

        <div className="contact-details">
          <h2>Contact Information</h2>
          <p>Feel free to reach us through the following channels:</p>
          <ul>
            <li><strong>Address:</strong> 123 Event Avenue, Melody Park, NY 10001</li>
            <li><strong>Email:</strong> support@mellodian.com</li>
            <li><strong>Phone:</strong> +1 (555) 123-4567</li>
          </ul>

          <div className="contact-map">
            <h3>Visit Us</h3>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345098496!2d144.9537353157587!3d-37.816279742021874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf4c2f3d4f1b08c76!2sMelbourne!5e0!3m2!1sen!2sau!4v1639815556617!5m2!1sen!2sau" 
              width="100%" 
              height="250" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              title="Google Maps Location">
            </iframe>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
   
  );
}

export default ContactUs;
