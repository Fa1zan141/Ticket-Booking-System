import  { useEffect, useState } from "react";
import "./styles/CardPaymentPage.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PaymentBanner from "./components/PaymentBanner";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const CardPaymentPage = () => {
  const location = useLocation();
  const { eventId, userId, tickets, totalAmount } = location.state; // Retrieve eventId, userId, tickets, and totalAmount
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });
  const [eventImage, setEventImage] = useState(null); // State for event image
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Fetch event details to get the image
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/events/${eventId}`);
        setEventImage(response.data.image); // Set event image
      } catch (err) {
        setError("Failed to load event details. Please try again.", err);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null); // Reset error state before starting a new request
    try {
      const token = localStorage.getItem("token"); // Get auth token

      if (!token) {
        setError("Session expired. Please log in to proceed.");
        return;
      }

      // Save payment details
      const paymentResponse = await axios.post(
        "http://localhost:3000/api/payments",
        cardDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (paymentResponse.status === 201) {
        const paymentId = paymentResponse.data.paymentId;

        // Save booking details
        const bookingResponse = await axios.post(
          "http://localhost:3000/api/bookings",
          {
            ticketCount: tickets,
            eventId,
            customerId: userId,
            paymentId,
            totalAmount,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (bookingResponse.status === 201) {
          setPaymentSuccess(true);
        } else {
          setError("Booking failed. Please try again.");
        }
      } else {
        setError("Payment failed. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
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
            {eventImage ? (
              <img
                src={`http://localhost:3000/${eventImage}`}
                alt="Event Banner"
                className="payment-image"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = "https://via.placeholder.com/600x400"; // Fallback image
                }}
              />
            ) : (
              <p>Loading event image...</p>
            )}
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
                disabled={isLoading}
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
