import { Link, useLocation } from "react-router-dom";
const SideBar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `text-sm font-medium transition ${
      location.pathname === path
        ? "text-stone-900 dark:text-slate-300"
        : "text-stone-400 hover:text-stone-700"
    }`;

  return (
    <aside className="fixed top-0 left-0 z-50 h-screen w-64 border-r border-stone-200 bg-white dark:border-zinc-700 dark:bg-zinc-800 shadow-sm">
      <nav className="flex h-full flex-col px-4 py-6">
          {/* Links */}
          <div className="flex flex-col gap-1">
            <Link to="/" className={linkClass("/")}>
              Dashboard
            </Link>
            <Link to="/transactions" className={linkClass("/transactions")}>
              Transactions
            </Link>
            <Link to="/add" className={linkClass("/add")}>
              Add
            </Link>
          </div>
      </nav>
    </aside>
  );
};

export default SideBar;
