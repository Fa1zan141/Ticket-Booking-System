import React, { useState } from "react";
import axios from "axios";
import "./styles/SignIn.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Send the login request to the backend
      const response = await axios.post("http://localhost:3000/api/auth/login", { email, password });

      // Extract token, role, and message from the response
      const { token, role, message } = response.data;

      // Store the token in localStorage and set the Authorization header for future requests
      localStorage.setItem("token", token);
      axios.defaults.headers['Authorization'] = `Bearer ${token}`;

      // Navigate based on role
      if (role === "admin") {
        navigate("/dashboard"); // Navigate to Add Event page for admin
      } else if (role === "user") {
        navigate("/"); // Navigate to Dashboard for user
      } else {
        // If role is unknown, show an error message
        setError("Unknown role. Contact support.");
      }
    } catch (error) {
      // Handle different types of errors from the server
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Failed to sign in. Please try again.");
      } else {
        setError("Network error. Please try again later.");
      }
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignIn}>
          <div className="input-box">
            <label>Enter Email*</label>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <label>Enter Password*</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Sign In
          </button>
        </form>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
