import React, { useState } from "react";
import { createRule } from "../api/RulesAPI";
import "../styling/HkSuperUserPageStyling.css";

const CreateRuleTab = () => {
  const [ruleName, setRuleName] = useState("");
  const [conditions, setConditions] = useState([{ factor: "", operator: "", value: "" }]);
  const [actions, setActions] = useState([{ factor: "", value: "" }]);

  const factorOptions = [
    { value: "hkMemberRole", label: "Medlemsrolle" },
    { value: "age", label: "Alder" },
    { value: "seniority", label: "Anciennitet" },
    { value: "hasEducation", label: "Faglig uddannelse" },
    { value: "student", label: "Studerende" },
    { value: "hoursWorked", label: "Arbejdstimer" },
    { value: "averageWeeklyHours", label: "Gennemsnitlige ugentlige timer" },
    { value: "workTimeStart", label: "Arbejdstid start" },
    { value: "workTimeEnd", label: "Arbejdstid slut" },
    { value: "overtimeHours", label: "Overarbejdstimer" },
    { value: "maxWeeklyHours", label: "Maksimalt ugentligt timetal" },
    { value: "maxDailyHours", label: "Maksimalt dagligt timetal" },
    { value: "weekendHours", label: "Weekendtimer" },
    { value: "nightHours", label: "Nattetimer" },
    { value: "holidayReductionHours", label: "Søgnehelligdagsreduktion" },
    { value: "calculatedSalary", label: "Beregnet løn" },
    { value: "hourlyRate", label: "Timeløn" },
    { value: "shiftAllowance", label: "Forskudttidstillæg" },
    { value: "overtimeRate", label: "Overarbejdstillæg" },
    { value: "weekendAllowance", label: "Weekendtillæg" },
    { value: "overtimeAllowance", label: "Overarbejdstillæg total" },
    { value: "overtimeEligible", label: "Berettiget til overarbejde" },
    { value: "weekendWorkAllowed", label: "Weekendarbejde tilladt" },
    { value: "flexiblePartTime", label: "Fleksibel deltidsansat" }
  ];

  const operatorOptions = [
    { value: ">", label: "Større end" },
    { value: "<", label: "Mindre end" },
    { value: ">=", label: "Større end eller lig med" },
    { value: "<=", label: "Mindre end eller lig med" },
    { value: "==", label: "Lig med" },
    { value: "!=", label: "Ikke lig med" },
    { value: "true", label: "Er sand" },
    { value: "false", label: "Er falsk" },
    { value: "&&", label: "OG" },
    { value: "||", label: "ELLER" },
    { value: "between", label: "Mellem (interval)" }
  ];

  const handleAddCondition = () => {
    setConditions([...conditions, { factor: "", operator: "", value: "" }]);
  };

  const handleAddAction = () => {
    setActions([...actions, { factor: "", value: "" }]);
  };

  const handleConditionChange = (index, field, value) => {
    const updatedConditions = [...conditions];
    updatedConditions[index][field] = value;
    setConditions(updatedConditions);
  };

  const handleActionChange = (index, field, value) => {
    const updatedActions = [...actions];
    updatedActions[index][field] = value;
    setActions(updatedActions);
  };

  const handleSubmit = async () => {
    const buildConditionString = (conditions) => {
        return conditions
            .map((cond) => {
                if (cond.operator === "true" || cond.operator === "false") {
                    return `${cond.factor} == ${cond.operator}`;
                }
                if (cond.factor === "hkMemberRole") {
                    return `${cond.factor} ${cond.operator} HKMemberRole.${cond.value}`;
                }
                return `${cond.factor} ${cond.operator} ${cond.value}`;
            })
            .join(", ");
    };

    const conditionString = `$employee: Employee(${buildConditionString(conditions)})`;

    const actionString = actions
        .map((act) => {
            const value = act.value;
            let processedValue = value
                .replace(/hourlyRate/g, '$employee.getHourlyRate()')
                .replace(/overtimeHours/g, '$employee.getOvertimeHours()')
                .replace(/calculatedSalary/g, '$employee.getCalculatedSalary()')
                .replace(/averageWeeklyHours/g, '$employee.getAverageWeeklyHours()');

            return `$employee.set${capitalize(act.factor)}(${processedValue}); update($employee);`;
        })
        .join("\n");

    const payload = {
        ruleName,
        conditions: conditionString,
        actions: actionString,
        status: true,
    };

    try {
        await createRule(payload);
        alert("Regel gemt succesfuldt!");
        resetForm();
    } catch (error) {
        console.error("Error saving rule:", error);
        alert("Fejl ved gemning af regel");
    }
};

  const resetForm = () => {
    setRuleName("");
    setConditions([{ factor: "", operator: "", value: "" }]);
    setActions([{ factor: "", value: "" }]);
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="rule-builder">
      <h2>Opret Ny Regel</h2>

      <div className="form-group">
        <label>Regel Navn:</label>
        <input
          type="text"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
          placeholder="F.eks. Arbejdstidsregel"
        />
      </div>

      <div className="section">
        <h3>Betingelser</h3>
        {conditions.map((cond, index) => (
          <div key={index} className="row">
            <select
              value={cond.factor}
              onChange={(e) => handleConditionChange(index, "factor", e.target.value)}
            >
              <option value="">Vælg faktor</option>
              {factorOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <select
              value={cond.operator}
              onChange={(e) => handleConditionChange(index, "operator", e.target.value)}
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
              value={cond.value}
              placeholder="Værdi"
              onChange={(e) => handleConditionChange(index, "value", e.target.value)}
            />
            {index > 0 && (
              <button 
                onClick={() => {
                  const newConditions = [...conditions];
                  newConditions.splice(index, 1);
                  setConditions(newConditions);
                }}
                className="remove-button"
              >
                Fjern
              </button>
            )}
          </div>
        ))}
        <button onClick={handleAddCondition}>+ Tilføj Betingelse</button>
      </div>

      <div className="section">
        <h3>Handlinger</h3>
        {actions.map((act, index) => (
          <div key={index} className="row">
            <select
              value={act.factor}
              onChange={(e) => handleActionChange(index, "factor", e.target.value)}
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
              value={act.value}
              placeholder="Værdi"
              onChange={(e) => handleActionChange(index, "value", e.target.value)}
            />
            {index > 0 && (
              <button 
                onClick={() => {
                  const newActions = [...actions];
                  newActions.splice(index, 1);
                  setActions(newActions);
                }}
                className="remove-button"
              >
                Fjern
              </button>
            )}
          </div>
        ))}
        <button onClick={handleAddAction}>+ Tilføj Handling</button>
      </div>

      <button onClick={handleSubmit} className="submit-button">
        Gem Regel
      </button>
    </div>
  );
};

export default CreateRuleTab;