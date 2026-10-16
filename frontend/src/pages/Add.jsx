import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { addTransaction } from "../services/transactionService";

const Add = () => {
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const resetForm = () => {
    setType("");
    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setCategory("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!type) return alert("Please select a type");
    if (!category) return alert("Please select a category");
    if (!amount || amount <= 0) return alert("Please add a valid amount");
    if (!date) return alert("Please select a date");
    await addTransaction({ type, amount, category, description, date });
    resetForm();
    alert("Successfully added!");
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition focus:border-indigo-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200";

  const labelClass =
    "mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400";

  const categories =
    type === "expense"
      ? ["Food", "Transport", "Bills", "Shopping", "Health", "Other"]
      : ["Salary", "Freelance", "Business", "Other"];

  return (
    <main className="mx-auto max-w-lg px-4 py-6 md:py-8">
      {/* Header */}
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
        Keep your records current
      </p>
      <h1 className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">
        Add transaction
      </h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Record an income or expense manually.
      </p>

      {/* Form card */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={labelClass}>Type</label>
            <select value={type} onChange={handleTypeChange} className={inputClass}>
              <option value="">Select type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Amount (Rs.)</label>
            <input
              type="number"
              value={amount}
              placeholder="0.00"
              onChange={(e) => setAmount(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Description <span className="font-normal normal-case text-slate-400">(optional)</span>
            </label>
            <input
              type="text"
              value={description}
              placeholder="What was this for?"
              onChange={(e) => setDescription(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
          >
            Save transaction <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </main>
  );
};

export default Add;
