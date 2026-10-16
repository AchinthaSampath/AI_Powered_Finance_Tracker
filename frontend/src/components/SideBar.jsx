import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Wallet, Home, BarChart3, Upload, Plus } from "lucide-react";
import FileUpload from "./FileUpload";

const SideBar = () => {
  const location = useLocation();
  const [showImport, setShowImport] = useState(false);

  const itemClass = (active) =>
    `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
      active
        ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400"
        : "text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700/50 dark:hover:text-slate-200"
    }`;

  return (
    <>
      <aside className="fixed top-0 left-0 z-50 h-screen w-64 border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 hidden md:block">
        <nav className="flex h-full flex-col px-4 py-6">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500">
              <Wallet size={20} className="text-white" />
            </div>
            <span className="text-lg font-semibold text-slate-900 dark:text-white">ClearMoney</span>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <Link to="/" className={itemClass(location.pathname === "/")}>
              <Home size={20} /> Overview
            </Link>

            <Link to="/transactions" className={itemClass(location.pathname === "/transactions")}>
              <BarChart3 size={20} /> Transactions
            </Link>

            <button onClick={() => setShowImport(true)} className={itemClass(false)}>
              <Upload size={20} /> Import statement
            </button>

            <Link to="/add" className={itemClass(location.pathname === "/add")}>
              <Plus size={20} /> Add transaction
            </Link>
          </div>
        </nav>
      </aside>

      {showImport && <FileUpload onClose={() => setShowImport(false)} />}
    </>
  );
};

export default SideBar;
