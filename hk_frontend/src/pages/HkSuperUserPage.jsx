import React, { useState } from "react";
import RulesTab from "./RulesTab";
import LogoutButton from "../components/LogoutButton";
import CreateRuleTab from "./CreateRuleTab";
import "../styling/HkSuperUserPageStyling.css";

const HkSuperUserPage = () => {
  const [activeTab, setActiveTab] = useState("view");

  return (
    <div className="superuser-page">
      <h1>HK SuperUser Page</h1>
      <LogoutButton />

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "view" ? "active" : ""}`}
          onClick={() => setActiveTab("view")}
        >
          View/Edit Rules
        </button>
        <button
          className={`tab-button ${activeTab === "create" ? "active" : ""}`}
          onClick={() => setActiveTab("create")}
        >
          Create New Rule
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "view" && <RulesTab />}
        {activeTab === "create" && <CreateRuleTab />}
      </div>
    </div>
  );
};

export default HkSuperUserPage;
