import React, { useEffect, useState } from "react";
import { getAdminActions } from "../api/AdminActionAPI"; 
import "../styling/AdminActionTabStyling.css"; 

const AdminActionsTab = () => {
  const [adminActions, setAdminActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminActions = async () => {
      try {
        const actions = await getAdminActions(); 
        setAdminActions(actions);
      } catch (err) {
        setError("Failed to load admin actions.");
        console.error("Error fetching admin actions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminActions();
  }, []);

  if (loading) {
    return <div>Loading admin actions...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="admin-actions-tab">
      <h2>Admin Actions</h2>
      <table className="admin-actions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Action type</th>
            <th>Admin Name</th>
            <th>Rule Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {adminActions.map((action) => (
            <tr key={action.id}>
              <td>{action.id}</td>
              <td>{action.actionType}</td>
              <td>{action.adminName}</td>
              <td>{action.ruleName}</td>
              <td>{new Date(action.actionTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminActionsTab;
