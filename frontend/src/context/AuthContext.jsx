import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api.js";
//is the token still valid and who's is it
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // if a token is saved, we must check it with the server before deciding who is logged in
  const [loading, setLoading] = useState(() => !!localStorage.getItem("token"));

  useEffect(() => {
    if (!localStorage.getItem("token")) return;

    const checkSession = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (error) {
        console.log("session check failed", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    void checkSession();
  }, []);

  // save the token to browser
  const saveSession = (data) => {
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    saveSession(res.data);
  };

  const register = async (username, email, password) => {
    const res = await api.post("/auth/register", { username, email, password });
    saveSession(res.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);