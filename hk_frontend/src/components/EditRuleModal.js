import React, { useState } from "react";
import "../App.css";

const EditRuleModal = ({ rule, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    ruleName: rule.ruleName,
    conditions: parseConditions(rule.conditions),
    actions: parseActions(rule.actions),
    status: rule.status
  });

  const factorOptions = [
    { value: "hkMemberRole", label: "Medlemsrolle" },
    { value: "hoursWorked", label: "Arbejdstimer" },
    { value: "averageWeeklyHours", label: "Gennemsnitlige ugentlige timer" },
    { value: "overtimeEligible", label: "Berettiget til overarbejde" },
    { value: "calculatedSalary", label: "Beregnet løn" },
    { value: "hourlyRate", label: "Timeløn" },
    { value: "overtimeHours", label: "Overarbejdstimer" },
    { value: "holidayReductionHours", label: "Søgnehelligdagsreduktion" },
    { value: "weekendWorkAllowed", label: "Weekendarbejde tilladt" },
    { value: "flexiblePartTime", label: "Fleksibel deltidsansat" },
    { value: "shiftAllowance", label: "Forskudttidstillæg" },
    { value: "weekendAllowance", label: "Weekendtillæg" },
    { value: "overtimeAllowance", label: "Overarbejdstillæg" },
    { value: "age", label: "Alder" },
    { value: "seniority", label: "Anciennitet" }
  ];

  const operatorOptions = [
    { value: ">", label: "Større end" },
    { value: "<", label: "Mindre end" },
    { value: ">=", label: "Større end eller lig med" },
    { value: "<=", label: "Mindre end eller lig med" },
    { value: "==", label: "Lig med" },
    { value: "!=", label: "Ikke lig med" }
  ];

  function parseConditions(conditionString) {
    try {
      const cleanString = conditionString.replace('$employee: Employee(', '').replace(')', '');
      
      const conditions = cleanString.split('&&').map(condition => {
        const [factor, operator, value] = condition.trim().split(/\s+/);
        return {
          factor: factor,
          operator: operator,
          value: value.replace(/['"]/g, '')
        };
      });

      return conditions;
    } catch (error) {
      console.error('Error parsing conditions:', error);
      return [{ factor: "", operator: "", value: "" }];
    }
  }

  function parseActions(actionString) {
    try {
      const actions = actionString.split('\n').map(action => {
        const matches = action.match(/set(\w+)\(([^)]+)\)/);
        if (matches) {
          return {
            factor: matches[1].toLowerCase(),
            value: matches[2].replace(';', '').trim()
          };
        }
        return { factor: "", value: "" };
      });
      return actions.filter(action => action.factor !== "");
    } catch (error) {
      console.error('Error parsing actions:', error);
      return [{ factor: "", value: "" }];
    }
  }

  const handleConditionChange = (index, field, value) => {
    const updatedConditions = [...formData.conditions];
    updatedConditions[index][field] = value;
    setFormData({ ...formData, conditions: updatedConditions });
  };

  const handleActionChange = (index, field, value) => {
    const updatedActions = [...formData.actions];
    updatedActions[index][field] = value;
    setFormData({ ...formData, actions: updatedActions });
  };

  const handleAddCondition = () => {
    setFormData({
      ...formData,
      conditions: [...formData.conditions, { factor: "", operator: "", value: "" }]
    });
  };

  const handleAddAction = () => {
    setFormData({
      ...formData,
      actions: [...formData.actions, { factor: "", value: "" }]
    });
  };

  const handleRemoveCondition = (index) => {
    const updatedConditions = formData.conditions.filter((_, i) => i !== index);
    setFormData({ ...formData, conditions: updatedConditions });
  };

  const handleRemoveAction = (index) => {
    const updatedActions = formData.actions.filter((_, i) => i !== index);
    setFormData({ ...formData, actions: updatedActions });
  };

  const buildRulePayload = () => {
    const conditionString = formData.conditions
      .map(cond => `$employee: Employee(${cond.factor} ${cond.operator} ${cond.value})`)
      .join(" && ");

    const actionString = formData.actions
      .map(act => `$employee.set${act.factor.charAt(0).toUpperCase() + act.factor.slice(1)}(${act.value}); update($employee);`)
      .join("\n");

    return {
      ...rule,
      ruleName: formData.ruleName,
      conditions: conditionString,
      actions: actionString
    };
  };

  const handleSave = async () => {
    try {
      const updatedRule = buildRulePayload();
      await onSave(updatedRule);
      onClose();
    } catch (error) {
      console.error("Failed to save rule:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Rediger Regel</h2>
        
        <div className="form-group">
          <label>Regel Navn:</label>
          <input
            type="text"
            value={formData.ruleName}
            onChange={(e) => setFormData({...formData, ruleName: e.target.value})}
            className="form-control"
          />
        </div>

        <div className="section">
          <h3>Betingelser</h3>
          {formData.conditions.map((condition, index) => (
            <div key={index} className="row">
              <select
                value={condition.factor}
                onChange={(e) => handleConditionChange(index, "factor", e.target.value)}
                className="form-control"
              >
                <option value="">Vælg faktor</option>
                {factorOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                value={condition.operator}
                onChange={(e) => handleConditionChange(index, "operator", e.target.value)}
                className="form-control"
              >
                <option value="">Vælg operator</option>
                {operatorOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={condition.value}
                onChange={(e) => handleConditionChange(index, "value", e.target.value)}
                placeholder="Værdi"
                className="form-control"
              />
              {index > 0 && (
                <button onClick={() => handleRemoveCondition(index)} className="remove-button">
                  Fjern
                </button>
              )}
            </div>
          ))}
          <button onClick={handleAddCondition} className="add-button">
            + Tilføj Betingelse
          </button>
        </div>

        <div className="section">
          <h3>Handlinger</h3>
          {formData.actions.map((action, index) => (
            <div key={index} className="row">
              <select
                value={action.factor}
                onChange={(e) => handleActionChange(index, "factor", e.target.value)}
                className="form-control"
              >
                <option value="">Vælg faktor</option>
                {factorOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={action.value}
                onChange={(e) => handleActionChange(index, "value", e.target.value)}
                placeholder="Værdi"
                className="form-control"
              />
              {index > 0 && (
                <button onClick={() => handleRemoveAction(index)} className="remove-button">
                  Fjern
                </button>
              )}
            </div>
          ))}
          <button onClick={handleAddAction} className="add-button">
            + Tilføj Handling
          </button>
        </div>

        <div className="modal-actions">
          <button onClick={handleSave} className="save-button">
            Gem
          </button>
          <button onClick={onClose} className="cancel-button">
            Annuller
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRuleModal;
