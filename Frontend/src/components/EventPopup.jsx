import React, { useState } from "react";
import "../styles/EventPopup.css";
import { AiOutlineClockCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { BsCalendar } from "react-icons/bs";

const EventPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2 className="popup-title">Add New Event</h2>
        <form className="popup-form">
        <div className="image-upload-section">
          <div className="image-placeholder">
            <AiOutlineCheckCircle className="image-check-icon" />
          </div>
        </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Event Name<span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter event name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Event Location<span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter event location"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Date<span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <input type="date" className="form-input" />
                <BsCalendar className="input-icon" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Time<span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <input type="time" className="form-input" />
                <AiOutlineClockCircle className="input-icon" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Price<span className="required">*</span>
              </label>
              <input
                type="number"
                className="form-input"
                placeholder="Enter price"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Description<span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter event description"
              />
            </div>
          </div>

          <div className="form-buttons">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save and Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventPopup;
