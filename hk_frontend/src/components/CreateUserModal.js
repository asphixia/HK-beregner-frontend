import React, { useState } from "react";
import { createUser } from "../api/UserAPI";
import "../styling/CreateUserModal.css";

const CreateUserModal = ({ closeModal, onUserCreated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "USER"
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await createUser(formData);
      onUserCreated(newUser);
      closeModal();
    } catch (error) {
      setError("Failed to create user. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Create New User</h2>
          <button onClick={closeModal} className="close-button">×</button>
        </div>

        <form onSubmit={handleSubmit} className="create-user-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-select"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="SUPERUSER">Superuser</option>
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-footer">
            <button type="submit" className="submit-button">
              Create User
            </button>
            <button 
              type="button" 
              onClick={closeModal}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;