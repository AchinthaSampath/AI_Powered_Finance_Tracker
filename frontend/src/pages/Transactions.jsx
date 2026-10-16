import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { deleteTransaction, getTransactions } from "../services/transactionService";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(``);

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
    fetchData();
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchData();
  }, []);

  const labelClass =
    "text-left text-xs font-bold text-zinc-500 uppercase tracking-widest px-6 py-4 dark:text-slate-300";

  if (loading)
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-400 text-sm tracking-widest uppercase">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-red-400 text-sm">Error: {error}</p>
      </div>
    );

  if (transactions.length < 1)
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-300 text-sm">No transactions yet</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-zinc-800">
      {/* Header */}
      <div className="border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-8 py-5">
          <h1 className="text-2xl font-bold text-stone-800 tracking-tight dark:text-slate-300">
            Transactions
          </h1>
          <p className="text-stone-400 text-sm mt-0.5">{transactions.length} total transactions</p>
          <label className="flex m-1">
            <Search />
            <input
              className="ml-1 dark:bg-gray-700"
              type="search"
              required
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-8 dark:bg-gray-700 rounded-xl">
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden dark:bg-gray-800">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
                <th className={labelClass}>Type</th>
                <th className={labelClass}>Category</th>
                <th className={labelClass}>Date</th>
                <th className={labelClass}>Description</th>
                <th className="text-right text-xs font-bold text-zinc-500 uppercase tracking-widest px-6 py-4 dark:text-slate-300">
                  Amount
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {transactions
                .filter((t) => t.category.toLowerCase().includes(search.toLowerCase()))
                .map((t) => (
                  <tr
                    key={t._id}
                    className="border-b border-stone-50 hover:bg-stone-50 transition hover:dark:bg-slate-600"
                  >
                    {/* Type badge */}
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          t.type === "income"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-rose-50 text-rose-600"
                        }`}
                      >
                        {t.type}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 text-sm text-stone-700 dark:text-slate-300">
                      {t.category}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-stone-400">
                      {new Date(t.date).toLocaleDateString("en-GB")}
                    </td>

                    {/* Description */}
                    <td className="px-6 py-4 text-sm text-stone-400">{t.description || "—"}</td>

                    {/* Amount */}
                    <td
                      className={`px-6 py-4 text-sm font-semibold text-right ${
                        t.type === "income" ? "text-emerald-500" : "text-rose-500"
                      }`}
                    >
                      {t.type === "income" ? "+" : "-"} Rs. {t.amount.toLocaleString()}
                    </td>

                    {/* Delete */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="text-xs text-stone-300 hover:text-rose-500 transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
