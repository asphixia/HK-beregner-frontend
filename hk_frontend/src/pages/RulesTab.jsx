import React, { useEffect, useState } from "react";
import { fetchRules, updateRule } from "../api/RulesAPI";
import EditRuleModal from "../components/EditRuleModal";
import { jwtDecode } from 'jwt-decode';
import "../styling/RulesTabStyling.css";


const RulesTab = () => {
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; 

    const loadRules = async () => {
      if (!isMounted) return; 
      
      setIsLoading(true);
      try {
        const data = await fetchRules();
        if (isMounted) {
          setRules(data);
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error in loadRules:", error);
          setError("Failed to fetch rules. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadRules();

    return () => {
      isMounted = false;
    };
  }, []);

  const openEditModal = (rule) => {
    setSelectedRule(rule);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedRule(null);
    setIsModalOpen(false);
  };

  const handleUpdateRule = async (updatedRule) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No token found in session storage");
      }
      const decodedToken = jwtDecode(token);
      const adminName = decodedToken.username;
      
      await updateRule(updatedRule, adminName);
      setRules((prevRules) =>
        prevRules.map((rule) =>
          rule.ruleId === updatedRule.ruleId ? updatedRule : rule
        )
      );
      closeEditModal();
    } catch (error) {
      console.error("Error updating rule:", error);
      setError("Failed to update rule. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading rules...</div>;
  }

  return (
    <div className="rules-container">
      <h2>Rules Overview</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!isLoading && rules.length === 0 && (
        <div className="no-rules-message">
          No rules available.
        </div>
      )}

      {rules.length > 0 && (
        <table className="rules-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Rule Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => (
              <tr key={rule.ruleId}>
                <td>{rule.ruleId}</td>
                <td>{rule.ruleName}</td>
                <td>{rule.description}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => openEditModal(rule)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && selectedRule && (
        <EditRuleModal
          rule={selectedRule}
          onClose={closeEditModal}
          onSave={handleUpdateRule}
        />
      )}
    </div>
  );
};

export default RulesTab;