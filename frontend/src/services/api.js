import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api" });

// before every request: attach the token if we have one
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// after every response: a 401 means the token is missing, invalid or expired
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const url = error.config?.url || "";
    const isAuthCall = url.includes("/auth/login") || url.includes("/auth/register");

    if (error.response?.status === 401 && !isAuthCall) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;