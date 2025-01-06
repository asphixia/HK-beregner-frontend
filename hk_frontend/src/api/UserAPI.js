import axios from "axios";

const BASE_URL = 'http://localhost:8080/api';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/getALlUsers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const updateUser = async (user) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${BASE_URL}/users/updateUser/${user.userId}`, {
      userId: user.userId,       
      username: user.username,
      role: user.role,
      email: user.email         
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log("User updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    if (error.response) {
      console.error("Server error:", error.response.data);
    }
    throw error;
  }
};


export const createUser = async (userData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_URL}/users/createUser`, {
      username: userData.username,
      password: userData.password,
      email: userData.email,
      role: userData.role
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};