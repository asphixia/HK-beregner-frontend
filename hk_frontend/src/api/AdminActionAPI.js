import axios from "axios";

const BASE_URL = 'http://localhost:8080/api';

export const getAdminActions = async () => {
  const token = localStorage.getItem("token")
  const response = await axios.get(`${BASE_URL}/adminactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

