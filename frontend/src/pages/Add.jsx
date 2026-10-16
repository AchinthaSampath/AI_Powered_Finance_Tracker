import { useState } from "react";
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
    e.preventDefault(); // data validation
    if (!type) return alert("Please select a type");
    if (!category) return alert("Please select a category");
    if (!amount || amount < 0) return alert("Please add a valid amount");
    if (!date) return alert("Please select a date");
    await addTransaction({ type, amount, category, description, date });
    resetForm();
    alert("Successfully added!");
  };

  const inputClass =
    "w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-700 focus:outline-none focus:border-stone-400 transition dark:bg-zinc-800 dark:text-slate-300";

  const labelClass =
    "block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 dark:text-slate-300";

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-zinc-800">
      {/* Header */}
      <div className="border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-8 py-5">
          <h1 className="text-2xl font-bold text-stone-800 tracking-tight dark:text-slate-300">
            Add Transaction
          </h1>
          <p className="text-stone-400 text-sm mt-0.5">Record a new income or expense</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="max-w-lg">
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8 dark:bg-gray-700">
            <form className="space-y-6">
              {/* Type */}
              <div>
                <label className={labelClass}>Type</label>
                <select value={type} onChange={handleTypeChange} className={inputClass}>
                  <option value="">Select type</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className={labelClass}>Category</label>
                {type === "expense" ? (
                  <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select category</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Bills">Bills</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Health">Health</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select category</option>
                    <option value="Salary">Salary</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </select>
                )}
              </div>

              {/* Amount */}
              <div>
                <label className={labelClass}>Amount (Rs.)</label>
                <input
                  type="number"
                  name="amount"
                  value={amount}
                  placeholder="0.00"
                  onChange={(e) => setAmount(e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Description */}
              <div>
                <label className={labelClass}>
                  Description <span className="normal-case text-stone-300">(optional)</span>
                </label>
                <input
                  type="text"
                  name="description"
                  value={description}
                  placeholder="What was this for?"
                  onChange={(e) => setDescription(e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Date */}
              <div>
                <label className={labelClass}>Date</label>
                <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Submit */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-stone-900 text-white text-sm tracking-widest uppercase py-3.5 rounded-xl hover:bg-stone-700 transition duration-200 mt-2"
              >
                Add Transaction →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
