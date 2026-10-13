import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Add from "./pages/Add";
import Transactions from "./pages/Transactions";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import SideBar from "./components/SideBar";


const AppContent = () => {
    const { theme } = useTheme();
    return (
    <div className={theme ? "dark" : ""}>
    <BrowserRouter>
      <SideBar />
      <div className="ml-64">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<Add />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;