import React from "react";
import "./styles/SignIn.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/signup"); 
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Sign In</h2>
        <form>
          <div className="input-box">
            <label>Enter Email*</label>
            <input type="email" placeholder="Your Email" required />
          </div>
          <div className="input-box">
            <label>Enter Password*</label>
            <input type="password" placeholder="Password" required />
          </div>
          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="btn-primary">Sign In</button>
        </form>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
