import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/EventPopup.css";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsCalendar } from "react-icons/bs";
import { useParams } from "react-router-dom";

const UpdateEventForm = () => {
  const { id } = useParams();
  console.log("here is the id", id);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    time: "",
    price: "",
    description: "",
  });

  const [imagePreview, setImagePreview] = useState(null); // State to preview existing or newly uploaded image
  const [image, setImage] = useState(null); // State to hold the new image
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const eventId = id;

  useEffect(() => {
    if (eventId) {
      fetchEventData(eventId);
    }
  }, [eventId]);

  // Fetch event data
  const fetchEventData = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const eventData = response.data;
      setFormData({
        name: eventData.name,
        location: eventData.location,
        date: eventData.date.split('T')[0], 
        time: eventData.time,
        price: eventData.price,
        description: eventData.description,
      });

      if (eventData.image) {
        setImagePreview(`http://localhost:3000/${eventData.image}`); // Preview existing event image
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch event data.");
      dismissMessage(setError);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Preview newly uploaded image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (image) {
      data.append("image", image); // Append the new image to the form data
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
      setError(error.response?.data?.message || "Failed to update event.");
      dismissMessage(setError);
    }
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
              <span>Upload Event Image</span>
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
