import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { deleteTransaction, getTransactions } from "../services/transactionService";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this transaction?");
    if (!confirmed) return;
    await deleteTransaction(id);
    await fetchData();
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchData();
  }, []);

  const thClass =
    "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400";

  if (loading) return <p className="p-8 text-sm text-slate-400">Loading...</p>;
  if (error) return <p className="p-8 text-sm text-red-400">Error: {error}</p>;

  const filtered = transactions.filter((t) =>
    `${t.description || ""} ${t.category}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="px-8 py-8">
      {/* Header */}
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
        Your money history
      </p>
      <h1 className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">Transactions</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {transactions.length} transactions in your account
      </p>

      {/* Card */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        {/* Search */}
        <div className="p-4">
          <div className="relative w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search transactions"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 focus:border-indigo-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="border-y border-slate-100 dark:border-slate-800">
              <th className={thClass}>Transaction</th>
              <th className={thClass}>Category</th>
              <th className={thClass}>Date</th>
              <th className={`${thClass} text-right`}>Amount</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr
                key={t._id}
                className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
              >
                {/* Initials + description */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold ${
                        t.type === "income"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
                      }`}
                    >
                      {t.description
                        ?.split(" ")
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {t.description || "—"}
                    </span>
                  </div>
                </td>

                {/* Category pill */}
                <td className="px-6 py-4">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    {t.category}
                  </span>
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-sm text-slate-400">
                  {new Date(t.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </td>

                {/* Amount */}
                <td
                  className={`px-6 py-4 text-right text-sm font-semibold ${
                    t.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"} Rs. {t.amount.toLocaleString()}
                </td>

                {/* Delete */}
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="text-xs text-slate-300 transition hover:text-rose-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="p-8 text-center text-sm text-slate-400">No transactions found</p>
        )}
      </div>
    </main>
  );
};

export default Transactions;
