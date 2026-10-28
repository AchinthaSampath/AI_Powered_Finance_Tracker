import api from "./api"; // the shared client: it adds the token to every request

// Get all transactions
export const getTransactions = async () => {
  const response = await api.get("/transactions");
  return response.data;
};

// Add transaction
export const addTransaction = async (data) => {
  const response = await api.post("/transactions", data);
  return response.data;
};

// Delete transaction
export const deleteTransaction = async (id) => {
  const response = await api.delete(`/transactions/${id}`);
  return response.data;
};

// Get summary
export const getSummary = async () => {
  const response = await api.get("/summary");
  return response.data;
};

// Upload a CSV statement
export const fileUpload = async (formData) => {
  const response = await api.post("/upload", formData);
  return response.data;
};