import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/EventPopup.css";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsCalendar } from "react-icons/bs";

const UpdateEventForm = ({ eventId }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    time: "",
    price: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (eventId) {
      fetchEventData(eventId);
    }
  }, [eventId]);

  // Fetch current event data
  const fetchEventData = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData(response.data); // Populate form with event data
      if (response.data.imageUrl) {
        setImagePreview(response.data.imageUrl); // Preview existing event image
      }
    } catch (error) {
      handleError(error, "Failed to fetch event data.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (image) {
      data.append("image", image);
    }

    try {
      await axios.put(`http://localhost:3000/api/events/${eventId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Event updated successfully!");
      setError(null);
      dismissMessage(setSuccess);
    } catch (error) {
      handleError(error, "Failed to update event.");
    }
  };

  const validateForm = () => {
    if (formData.price <= 0) {
      setError("Price must be a positive number.");
      dismissMessage(setError);
      return false;
    }
    if (formData.description.trim().length < 10) {
      setError("Description must be at least 10 characters long.");
      dismissMessage(setError);
      return false;
    }
    return true;
  };

  const handleError = (error, defaultMessage) => {
    setError(error.response?.data?.message || defaultMessage);
    dismissMessage(setError);
  };

  const dismissMessage = (setter) => {
    setTimeout(() => {
      setter(null);
    }, 3000); // Dismiss message after 3 seconds
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Update Event</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form className="update-event-form" onSubmit={handleSubmit}>
        {/* Image Upload Section */}
        <div className="image-upload-section">
          {imagePreview ? (
            <img src={imagePreview} alt="Event Preview" className="image-preview" />
          ) : (
            <label className="image-placeholder">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                aria-label="Upload Event Image"
                hidden
              />
            </label>
          )}
        </div>

        {/* Form Fields */}
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
              aria-label="Event Name"
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
              aria-label="Event Location"
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
                aria-label="Event Date"
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
                aria-label="Event Time"
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
              aria-label="Event Price"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Description<span className="required">*</span>
            </label>
            <textarea
              className="form-input"
              placeholder="Enter event description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              aria-label="Event Description"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-buttons">
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEventForm;
