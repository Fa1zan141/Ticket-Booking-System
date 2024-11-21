import React, { useState } from "react";
import "./styles/CardPaymentPage.css";
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const CardPaymentPage = () => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handlePayment = () => {
    alert("Payment Submitted!");
  };
{/* const closePopup = () => {
    setPaymentSuccess(false);
  };
*/}
 
  return (
    <div className="payment-page-container">
      <Navbar></Navbar>

      <main className="payment-main">
        <h1 className="payment-title">PAYMENT</h1>
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
{/*
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
        */

}
      

      <Footer></Footer>
    </div>
  );
};

export default CardPaymentPage;
