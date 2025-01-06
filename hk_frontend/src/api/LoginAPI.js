import axios from "axios"

const BASE_URL = 'http://localhost:8080/api';

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data; 
    } catch (error) {
    throw error.response?.data || 'Error occurred';
    }
};
