import { Link } from "react-router-dom";
import { Plus, Sun, Moon, Wallet, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();

  const month = new Date().toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <nav className="border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center justify-end gap-4">
        <span className="text-xs text-slate-400">{month}</span>

        {/* One toggle button */}
        <button
          onClick={() => setTheme(theme ? "" : "dark")}
          className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          {theme ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Add transaction */}
        <Link
          to="/add"
          className="flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600"
        >
          <Plus size={16} /> Add transaction
        </Link>
        <button
          onClick={logout}
          aria-label="Log out"
          className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 md:hidden"
        >
          <LogOut size={18} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
