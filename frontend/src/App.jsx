import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Add from "./pages/Add";
import Transactions from "./pages/Transactions";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

const AppContent = () => {
  const { theme } = useTheme();
  return (
    <div className={theme ? "dark" : ""}>
      <BrowserRouter>
        <Routes>
          {/* public: no sidebar or navbar */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* gate: must be logged in */}
          <Route element={<ProtectedRoute />}>
            {/* shell: sidebar + navbar + bottom bar around the page */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<Add />} />
              <Route path="/transactions" element={<Transactions />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </ThemeProvider>
);

export default App;