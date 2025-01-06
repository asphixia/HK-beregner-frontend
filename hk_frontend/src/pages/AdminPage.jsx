import React, { useState } from "react";
import RulesTab from "./RulesTab";
import UsersTab from "./UsersTab";
import AdminActionTab from "./AdminActionTab"; 
import LogoutButton from "../components/LogoutButton";
import "../styling/AdminPageStyling.css";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("rules");

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <LogoutButton />
      </header>
      <div className="admin-tabs">
        <button
          onClick={() => setActiveTab("rules")}
          className={`admin-tab ${activeTab === "rules" ? "active-tab" : ""}`}
        >
          Rules
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`admin-tab ${activeTab === "users" ? "active-tab" : ""}`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab("adminActions")}
          className={`admin-tab ${
            activeTab === "adminActions" ? "active-tab" : ""
          }`}
        >
          Admin Actions
        </button>
      </div>
      <div className="admin-content">
        {activeTab === "rules" && <RulesTab />}
        {activeTab === "users" && <UsersTab />}
        {activeTab === "adminActions" && <AdminActionTab />}
      </div>
    </div>
  );
};

export default AdminPage;
