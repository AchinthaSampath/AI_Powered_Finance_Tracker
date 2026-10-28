import { Wallet } from "lucide-react";

const AuthLayout = ({ title, subtitle, children, footer }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-900">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-950">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500">
            <Wallet size={20} className="text-white" />
          </div>
          <span className="text-lg font-semibold text-slate-900 dark:text-white">ClearMoney</span>
        </div>

        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{title}</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>

        {children}

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">{footer}</p>
      </div>
    </div>
  );
};

export default AuthLayout;