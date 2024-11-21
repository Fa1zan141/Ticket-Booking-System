import React, { useState } from "react";
import "./styles/PaymentPage.css";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useNavigate } from "react-router-dom";
const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/Payconfirmation"); 
  };

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
          <div className="payment-method-wrapper">
            <h2 className="payment-method-title">Select Payment Method</h2>
            <div className="payment-methods">
              <div className="suggested-method">
                <h3>Suggested Payment Method</h3>
                <button
                  className={`payment-button ${
                    paymentMethod === "bank" ? "active" : ""
                  }`}
                  onClick={() => handlePaymentChange("bank")}
                >
                  Payment Via Bank Account
                </button>
              </div>
              <div className="other-methods">
                <h3>Other Payment Methods</h3>
                <button
                  className={`payment-button ${
                    paymentMethod === "credit" ? "active" : ""
                  }`}
                  onClick={() => handlePaymentChange("credit")}
                >
                  Payment Via Credit Card
                </button>
              </div>
            </div>
            <button onClick={handleNavigation} className="next-button">Next</button>
          </div>
        </div>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default PaymentPage;
