import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UserForm.css";

const UpdateUserForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    username: "",
    role: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);

  // Fetch user data
  const fetchUserData = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData(response.data); // Pre-fill form with user data
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch user data.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      await axios.put(`http://localhost:3000/api/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setSuccess("User updated successfully!");
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update user.");
      setSuccess(null);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Update User</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form className="update-user-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">
              Username<span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Role<span className="required">*</span>
            </label>
            <select
              className="form-input"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Password<span className="required">*</span>
            </label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserForm;
