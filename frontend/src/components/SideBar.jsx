import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Wallet,
  Home,
  BarChart3,
  Upload,
  Plus,
  LogOut,
  ChevronsUpDown,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

// "alice" -> "AL", "john smith" -> "JS"
const getInitials = (name = "") => {
  const parts = name
    .trim()
    .split(/[\s._-]+/)
    .filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const SideBar = ({ onImport }) => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const itemClass = (active) =>
    `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
      active
        ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400"
        : "text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700/50 dark:hover:text-slate-200"
    }`;

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 md:block">
      <nav className="flex h-full flex-col px-4 py-6">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500">
            <Wallet size={20} className="text-white" />
          </div>
          <span className="text-lg font-semibold text-slate-900 dark:text-white">
            ClearMoney
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <Link to="/" className={itemClass(pathname === "/")}>
            <Home size={20} /> Overview
          </Link>
          <Link
            to="/transactions"
            className={itemClass(pathname === "/transactions")}
          >
            <BarChart3 size={20} /> Transactions
          </Link>
          <button onClick={onImport} className={itemClass(false)}>
            <Upload size={20} /> Import statement
          </button>
          <Link to="/add" className={itemClass(pathname === "/add")}>
            <Plus size={20} /> Add transaction
          </Link>
        </div>

        {/* Profile */}
        <div className="relative mt-auto">
          {menuOpen && (
            <>
              {/* invisible layer: clicking anywhere outside closes the menu */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute bottom-full left-0 right-0 z-20 mb-2 rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-800">
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-rose-500 transition hover:bg-slate-100 dark:hover:bg-slate-700/50"
                >
                  <LogOut size={16} /> Log out
                </button>
              </div>
            </>
          )}

          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="relative z-20 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-slate-100 dark:hover:bg-slate-700/50"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
              {getInitials(user?.username)}
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block truncate text-sm font-medium text-slate-900 dark:text-white">
                {user?.username}
              </span>
              <span className="block truncate text-xs text-slate-400">
                {user?.email}
              </span>
            </span>
            <ChevronsUpDown size={16} className="shrink-0 text-slate-400" />
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;
