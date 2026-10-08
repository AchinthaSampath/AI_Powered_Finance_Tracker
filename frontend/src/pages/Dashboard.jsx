import { useState, useEffect } from "react";
import { getSummary, getTransactions } from "../services/transactionService";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import FileUpload from "../components/FileUpload";
import { Wallet, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getSummary();
      const transaction = await getTransactions();
      setSummary(data);
      setTransactions(transaction);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchData();
  }, []);

  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount; {/*acc = running object of categorized totals t = current transaction being processed Returns a single object: { Food: 50, Transport: 30 }*/}
      return acc;
    }, {}); 

  const chartData = {
    labels: Object.keys(expensesByCategory), //[Food,Travelling]
    datasets: [
      {
        data: Object.values(expensesByCategory),//[rs 3000, rs 5000]
        backgroundColor: [
          "#f87171",
          "#fb923c",
          "#facc15",
          "#34d399",
          "#60a5fa",
          "#a78bfa",
        ],
        borderWidth: 0,
      },
    ],
  };

  const recentTransactions = [...transactions] //... copy of the transaction array, sort from recent
    .sort((a, b) => new Date(b.date) - new Date(a.date)) 
    .slice(0, 5);

  if (loading)
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-400 text-sm tracking-widest uppercase">
          Loading...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-red-400 text-sm">Error: {error}</p>
      </div>
    );

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50 px-8 py-8 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">
            Good morning, User.
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Here's your financial snapshot for this month.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mt-6 grid grid-cols-3 gap-5">
        {/* Balance */}
        <div className="rounded-2xl bg-indigo-600 p-6 text-white">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-indigo-100">
            <div className="bg-indigo-500 rounded-md p-1">
              <Wallet className="h-4 w-4" />
            </div>
            Total Balance
          </div>
          <p
            className={`mt-4 text-2xl font-semibold ${summary.balance >= 0 ? "text-white" : "text-rose-400"}`}
          >
            Rs. {summary.balance.toLocaleString()}
          </p>
        </div>

        {/* Income */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            <div className="p-1 bg-green-50 rounded-md">
              <ArrowDownLeft className="h-4 w-4" />
            </div>
            Income
          </div>
          <p className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">
            Rs. {summary.totalIncome.toLocaleString()}
          </p>
        </div>

        {/* Expenses */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-orange-500">
            <div className="p-1 bg-orange-50 rounded-md">
              <ArrowUpRight className="h-4 w-4" />
            </div>
            Expenses
          </div>
          <p className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">
            Rs. {summary.totalExpenses.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart + Recent Transactions */}
      <div className="mt-5 grid grid-cols-5 gap-5">

        {/* Chart */}
        <div className="col-span-3 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
          
          {/*spendin overview text */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Spending overview
              </h2>
              <p className="text-sm text-slate-400">Where your money went</p>
            </div>
          </div>

          {/*Doghnut Chart + Category List*/}
          {Object.keys(expensesByCategory).length > 0 ? ( //check for categories [food,travel] > 0 
            <div className="mt-4 flex items-center gap-8">

              {/*Doghnut*/}
              <div style={{ width: "220px", minWidth: "220px" }} className="relative flex items-center justify-center">
                <Doughnut data={chartData} options={{cutout: "80%", // Sets thickness
                          plugins: {legend: {display: false, // Hides the legend boxes entirely
                          },},}}/>

                {/* Inside Doghnut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold text-stone-800 dark:text-white">
                    Rs.{(summary.totalExpenses / 1000).toLocaleString(undefined, {minimumFractionDigits: 1,maximumFractionDigits: 1,})}{" "}K
                  </span>
                  <span className="text-xs text-slate-400">Total spent</span>
                </div>
              </div>

              {/* Category list */}
              <ul className="flex-1 space-y-3"> 
                {chartData.labels.map((label, index) => {const percentage = summary.totalExpenses > 0 ? //index-[food,transport] grabs directly from chart data
                ((chartData.datasets[0].data[index] / summary.totalExpenses) * 100).toFixed(1) : 0; //stops dividing from zero and tofixed() round the numbers
                  return (
                  <li key={label} className="flex items-center justify-between gap-10 text-sm">
                    <span className="flex items-center gap-2">
                      <span className="inline-block h-2.5 w-2.5 rounded-full" 
                      style={{backgroundColor:chartData.datasets[0].backgroundColor[index % chartData.datasets[0].backgroundColor.length],}}/>
                        <span className="text-slate-700 dark:text-slate-300">
                          {label}
                        </span>
                      </span>

                      <span className="font-medium text-slate-500 dark:text-slate-400">
                        {percentage}%
                      </span>
                    </li>);})}
               </ul>
            </div>
          ) : ( // category.length < 0
            <div className="flex items-center justify-center h-40">   
              <p className="text-stone-300 text-sm">No expense data yet</p>
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="col-span-2 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Recent transactions
              </h2>
              <p className="text-sm text-slate-400">
                Your latest money activity
              </p>
            </div>
            <button className="flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
              <Link to="/transactions" className={"/transactions"}>
                View all <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </button>
          </div>

          {recentTransactions.length > 0 ? (
            <ul className="mt-5 space-y-4">
              {recentTransactions.map((t) => (
                <li key={t._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold ${
                        t.type === "income"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
                      }`}
                    >
                      {t.description?.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase()}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {t.description}
                      </p>
                      <p className="text-xs text-slate-400">
                        {t.category} ·{" "}
                        {new Date(t.date).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-sm font-semibold ${t.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"}`}
                  >
                    {t.type === "income" ? "+" : "-"} Rs.{" "}
                    {t.amount.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-center h-40">
              <p className="text-stone-300 text-sm">No transactions yet</p>
            </div>
          )}
        </div>
      </div>
      <FileUpload />
    </main>
  );
};

export default Dashboard;
