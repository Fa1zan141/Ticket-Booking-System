import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "./styles/SignIn.css";  

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState(""); // Username state
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();  // Initialize useNavigate hook

  // This function is used to automatically extract the username when the email changes
  useEffect(() => {
    if (email) {
      const emailUsername = email.split('@')[0]; // Extract username before '@'
      setUsername(emailUsername); // Set username state
    }
  }, [email]); 

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", { email, password, username });
      
      // If signup is successful, navigate to the SignIn page
      setSuccess("Account created successfully! Please sign in.");
      setError(null);  
      navigate("/signin"); // Navigate to SignIn page

    } catch (error) {
      setError(error.response?.data?.message || "Failed to sign up. Please try again.");
      setSuccess(null);  
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Sign Up</h2>
        
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSignUp}>
          <div className="input-box">
            <label>Enter Email*</label>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
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

          <div className="input-box">
            <label>Confirm Password*</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Sign Up
          </button>
        </form>
        
        <p>
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
