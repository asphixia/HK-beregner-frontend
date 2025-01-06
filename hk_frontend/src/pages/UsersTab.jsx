import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api/UserAPI";
import EditUserModal from "../components/EditUserModal";
import CreateUserModal from "../components/CreateUserModal";
import "../styling/UsersTabStyling.css";

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await fetchUsers();
      setUsers(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Could not load users. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.userId === updatedUser.userId ? updatedUser : user
      )
    );
    closeEditModal();
  };

  const handleUserCreated = (newUser) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
    closeCreateModal();
  };

  if (isLoading) {
    return <div className="loading-message">Loading users...</div>;
  }

  return (
    <div className="users-tab">
      <div className="users-header">
        <h2 className="users-title">Users</h2>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="create-button"
        >
          Create New User
        </button>
      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}

      {users.length > 0 ? (
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.userId}
                className="users-row"
              >
                <td>{user.userId}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="users-edit-action">
                  <button
                    onClick={() => handleUserClick(user)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="users-empty">No users available.</p>
      )}

      {isEditModalOpen && selectedUser && (
        <EditUserModal 
          user={selectedUser}
          closeModal={closeEditModal}
          onUpdate={handleUpdateUser}
        />
      )}

      {isCreateModalOpen && (
        <CreateUserModal 
          closeModal={closeCreateModal}
          onUserCreated={handleUserCreated}
        />
      )}
    </div>
  );
};

export default UsersTab;