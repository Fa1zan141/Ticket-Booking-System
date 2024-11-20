import React from "react";
import "./styles/SignIn.css";

const SignUp = () => {
  return (
    <div className="container">
      <div className="form-box">
        <h2>Sign Up</h2>
        <form>
          <div className="input-box">
            <label>Enter Email*</label>
            <input type="email" placeholder="Your Email" required />
          </div>
          <div className="input-box">
            <label>Enter Password*</label>
            <input type="password" placeholder="Password" required />
          </div>
          <div className="input-box">
            <label>Confirm Password*</label>
            <input type="password" placeholder="Confirm Password" required />
          </div>
          <button type="submit" className="btn-primary">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
