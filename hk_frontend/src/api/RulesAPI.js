import axios from "axios";
import {jwtDecode} from "jwt-decode";

const BASE_URL = 'http://localhost:8080/api';

export const fetchRules = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(`${BASE_URL}/rules`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Server error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
};


export const createRule = async (ruleData) => {
  try{
  console.log('ruleData:', ruleData);
  const token = localStorage.getItem("token"); 
  const response = await fetch(`${BASE_URL}/rules/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, 
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(ruleData),
  });

  if (!response.ok) {
    throw new Error("Failed to create rule");
  }

  const data = await response.json();
  return data;
} catch (error) {
  console.error('Error creating rule:', error);
  throw error;
}
};

export const updateRule = async (id, ruleData) => {
  try {
    console.log('ruleData:', ruleData);
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const username = decodedToken.sub;
    
    const response = await fetch(`http://localhost:8080/api/rules/${id}?username=${username}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ruleData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error updating rule:', error);
    throw error;
  }
};

export const deleteRule = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/api/rules/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting rule:', error);
    throw error;
  }
};