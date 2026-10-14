import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `text-sm font-medium transition ${
      location.pathname === path
        ? "text-stone-900 dark:text-slate-300"
        : "text-stone-400 hover:text-stone-700"
    }`;
  const {setTheme} = useTheme();
  return (
    <nav className="bg-white dark:bg-zinc-800 border-stone-200 px-8 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center justify-between gap-3">
          <div className="bg-zinc-100 dark:bg-zinc-700 p-2 rounded-xl">
            <button
            onClick={()=> {
              setTheme("");
            }}
            className="bg-transparent p-3 hover:bg-zinc-200 dark:hover:bg-zinc-100/10 rounded-lg text-black dark:text-white">
              <Sun />
            </button>
            <button 
             onClick={()=> {
              setTheme("dark");
            }}
            className="bg-transparent p-3 hover:bg-zinc-200 dark:hover:bg-zinc-100/10 rounded-lg text-black dark:text-white">
              <Moon />
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link to="/add" className={linkClass("/add")}>
            Add
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
