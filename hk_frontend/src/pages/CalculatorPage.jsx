import React, { useState } from 'react';
import '../styling/CalculatorPageStyling.css';
import { calculateExpectedSalary } from "../api/EmployeeAPI";

const CalculatorPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [employeeData, setEmployeeData] = useState({
    hkMemberRole: '',
    hoursWorked: 0,
    averageWeeklyHours: 37,
    overtimeEligible: false,
    calculatedSalary: 0,
    hourlyRate: 0,
    overtimeHours: 0,
    holidayReductionHours: 0,
    weekendWorkAllowed: false,
    flexiblePartTime: false,
    maxWeeklyHours: 0,
    maxDailyHours: 0
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployeeData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await calculateExpectedSalary(employeeData);
      setEmployeeData(result);
    } catch (err) {
      setError(err.message);
      console.error('Fejl ved beregning:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="salary-calculator">
      <h2>Beregn Forventet Løn</h2>
      
      <div className="calculator-section">
        <h3>Medarbejder Information</h3>
        <div className="input-row">
          <div className="input-group">
            <label>Rolle</label>
            <select
              name="hkMemberRole"
              value={employeeData.hkMemberRole}
              onChange={handleInputChange}
            >
              <option value="">Vælg rolle</option>
              <option value="MIDDLEMANAGER">Mellemleder</option>
              <option value="STOREWORKER">Butiksmedarbejder</option>
              <option value="STUDENT">Studerende</option>
              <option value="PARTTIMEWORKER">Deltidsansat</option>
            </select>
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Arbejdstimer (pr. måned)</label>
            <input
              type="number"
              name="hoursWorked"
              value={employeeData.hoursWorked}
              onChange={handleInputChange}
              min="0"
            />
          </div>
          
          <div className="input-group">
            <label>Gennemsnitlig ugentlig arbejdstid</label>
            <input
              type="number"
              name="averageWeeklyHours"
              value={employeeData.averageWeeklyHours}
              onChange={handleInputChange}
              min="0"
              max="48"
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Overarbejdstimer</label>
            <input
              type="number"
              name="overtimeHours"
              value={employeeData.overtimeHours}
              onChange={handleInputChange}
              min="0"
            />
          </div>
        </div>

        <div className="checkbox-row">
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="overtimeEligible"
              checked={employeeData.overtimeEligible}
              onChange={handleInputChange}
            />
            <label>Berettiget til overarbejde</label>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              name="weekendWorkAllowed"
              checked={employeeData.weekendWorkAllowed}
              onChange={handleInputChange}
            />
            <label>Weekendarbejde tilladt</label>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              name="flexiblePartTime"
              checked={employeeData.flexiblePartTime}
              onChange={handleInputChange}
            />
            <label>Fleksibel deltidsansat</label>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button 
          onClick={handleCalculate}
          disabled={loading}
          className="calculate-button"
        >
          {loading ? 'Beregner...' : 'Beregn Forventet Løn'}
        </button>

        {employeeData.calculatedSalary > 0 && (
          <div className="salary-result">
            <h3>Beregnet Løn</h3>
            <div className="result-grid">
              <div className="result-item">
                <label>Grundløn:</label>
                <span>{employeeData.calculatedSalary.toFixed(2)} DKK</span>
              </div>
              <div className="result-item">
                <label>Timeløn:</label>
                <span>{employeeData.hourlyRate.toFixed(2)} DKK/time</span>
              </div>
              <div className="result-item">
                <label>Overarbejdstimer:</label>
                <span>{employeeData.overtimeHours} timer</span>
              </div>
              <div className="result-item">
                <label>Søgnehelligdagsreduktion:</label>
                <span>{employeeData.holidayReductionHours} timer</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default CalculatorPage;
