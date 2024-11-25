import React, { useState } from "react";
import "./styles/CardPaymentPage.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PaymentBanner from "./components/PaymentBanner";
import { useNavigate } from "react-router-dom";

const CardPaymentPage = () => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handlePayment = () => {
    setPaymentSuccess(true);
  };

  const closePopup = () => {
    setPaymentSuccess(false);
    navigate("/"); 
  };

  return (
    <div className="payment-page-container">
      <Navbar />
      <PaymentBanner />
      <main className="payment-main">
        <div className="payment-content">
          <div className="payment-image-wrapper">
            <img
              src="../src/assets/Img1.jpg"
              alt="Christmas Event"
              className="payment-image"
            />
          </div>
          <div className="card-details-wrapper">
            <h2 className="card-details-title">Card Details</h2>
            <form className="card-form">
              <div className="input-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="---- ---- ---- ----"
                  value={cardDetails.cardNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="mm / yy"
                    value={cardDetails.expiryDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="---"
                    value={cardDetails.cvv}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="nameOnCard">Name on Card</label>
                <input
                  type="text"
                  id="nameOnCard"
                  name="nameOnCard"
                  placeholder="Enter Name"
                  value={cardDetails.nameOnCard}
                  onChange={handleInputChange}
                />
              </div>
              <button type="button" className="done-button" onClick={handlePayment}>
                Done
              </button>
            </form>
          </div>
        </div>
      </main>

      {paymentSuccess && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-icon">✔️</div>
            <h2 className="popup-title">Payment Successful</h2>
            <button className="popup-button" onClick={closePopup}>
              Back to Home
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CardPaymentPage;
