import React, { useState } from "react";
import axios from "axios";
import "../styles/EventPopup.css";
import { AiOutlineClockCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { BsCalendar } from "react-icons/bs";

const EventPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    location: "",
    date: "",
    time: "",
    price: "",
    description: "",
  });

  const [image, setImage] = useState(null); 
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(null); 

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); 

    const data = new FormData();
    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("date", formData.date);
    data.append("time", formData.time);
    data.append("price", formData.price);
    data.append("description", formData.description);
    if (image) {
      data.append("image", image); 
    }

    try {
      await axios.post("http://localhost:3000/api/events/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", 
        },
      });

      setSuccess("Event created successfully!");
      setError(null);
      setFormData({
        id:"",
        name: "",
        location: "",
        date: "",
        time: "",
        price: "",
        description: "",
      });
      setImage(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create event.");
      setSuccess(null);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2 className="popup-title">Add New Event</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form className="popup-form" onSubmit={handleSubmit}>
          <div className="image-upload-section">
            <label className="image-placeholder">
              <AiOutlineCheckCircle className="image-check-icon" />
              <input type="file" accept="image/*" onChange={handleImageChange} hidden />
            </label>
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
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
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
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Date<span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <input
                  type="date"
                  className="form-input"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
                <BsCalendar className="input-icon" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Time<span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <input
                  type="time"
                  className="form-input"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
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
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
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
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
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
