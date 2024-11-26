import  { useState } from "react";
import "./styles/PaymentPage.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useLocation,  useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId, userId } = location.state;

  const handleNavigation = () => {
    navigate("/Payconfirmation", { state: { eventId, userId } }); // Pass eventId and userId
  };

  return (
    <div className="payment-page-container">
      <Navbar />
      <div className="paymentsection">
        <h1 className="payment-title">PAYMENT</h1>
      </div>
      <main className="payment-main">
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
              <button
                className={`payment-button ${
                  paymentMethod === "credit" ? "active" : ""
                }`}
                onClick={() => setPaymentMethod("credit")}
              >
                Payment Via Credit Card
              </button>
            </div>
            <button onClick={handleNavigation} className="next-button">Next</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
