
import React, { useState } from "react";
import { updateUser } from "../api/UserAPI";
import "../styling/EditUserModalStyling.css";

const EditUserModal = ({ user, closeModal, onUpdate }) => {  
  const [username, setUsername] = useState(user.username);
  const [role, setRole] = useState(user.role);
  const [email, setEmail] = useState(user.email);

  const handleSave = async () => {
    try {
      const updatedUser = {
        userId: user.userId,
        username: username,
        role: role,
        email: email
      };
  
      console.log("Attempting to save user:", updatedUser);
      const result = await updateUser(updatedUser);
      
      if (onUpdate) {
        onUpdate(result);
      }
      
      closeModal();
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Rediger Bruger</h2>
        </div>
        <div className="modal-body">
          <form className="edit-user-form">
            <div className="form-group">
              <label>ID:</label>
              <span className="user-id">{user.userId}</span>
            </div>
            
            <div className="form-group">
              <label htmlFor="username">Brugernavn:</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="role">Rolle:</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-select"
              >
                <option value="ADMIN">Admin</option>
                <option value="USER">Bruger</option>
                <option value="SUPERUSER">Superbruger</option>
              </select>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button 
            type="button" 
            onClick={handleSave}
            className="button save-button"
          >
            Gem
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="button cancel-button"
          >
            Annuller
          </button>
        </div>
      </div>
    </div>
  );
};


export default EditUserModal;