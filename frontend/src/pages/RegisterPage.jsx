import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition focus:border-indigo-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200";
const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400";

const RegisterPage = () => {
  const { user, register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(username, email, password);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Your transactions stay private to you."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-indigo-500 hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className={labelClass}>Username</label>
          <input
            type="text"
            required
            minLength={3}
            placeholder="At least 3 characters"
            className={inputClass}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Password</label>
          <input
            type="password"
            required
            minLength={6}
            placeholder="At least 6 characters"
            className={inputClass}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-rose-500">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-indigo-500 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:opacity-50"
        >
          {submitting ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;