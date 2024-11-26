import React, { useState } from "react";
import "./styles/CardPaymentPage.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PaymentBanner from "./components/PaymentBanner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CardPaymentPage = () => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null); // Reset error state before starting a new request
    try {
      const token = localStorage.getItem("authToken");
      console.log("Retrieved Token:", token); // Debugging
  
      if (!token) {
        // Show error instead of redirecting
        setError("Session expired. Please log in to proceed.");
        return;
      }
  
      const response = await axios.post(
        "http://localhost:3000/api/payments",
        cardDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 201) {
        setPaymentSuccess(true);
      } else {
        setError("Unexpected error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Payment error:", err);
  
      if (err.response?.status === 401) {
        // Show error instead of redirecting
        setError("Unauthorized. Please log in again.");
      } else {
        const errorMessage =
          err.response?.data?.message || "Payment failed. Please try again.";
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const closePopup = () => {
    setPaymentSuccess(false);
    navigate("/"); // Navigate back to home
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
              alt="Event Banner"
              className="payment-image"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = "https://via.placeholder.com/600x400"; // Fallback image
              }}
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
                    placeholder="MM/YY"
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
              <button
                type="button"
                className="done-button"
                onClick={handlePayment}
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? "Processing..." : "Done"}
              </button>
            </form>
          </div>
        </div>
      </main>

      {error && <div className="error-message">{error}</div>}

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
