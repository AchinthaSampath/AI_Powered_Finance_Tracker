import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Get all transactions
export const getTransactions = async () => {
  const response = await API.get("/transactions");
  return response.data;
};

// Add transaction
export const addTransaction = async (data) => {
  const response = await API.post("/transactions", data);
  return response.data;
};

// Delete transaction
export const deleteTransaction = async (id) => {
  const response = await API.delete(`/transactions/${id}`);
  return response.data;
};

// Get summary
export const getSummary = async () => {
  const response = await API.get("/summary");
  return response.data;
};

export const fileUpload = async (formData) => {
  const response = await API.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};