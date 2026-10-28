import { Navigate, Outlet } from "react-router-dom";
import { LoaderIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderIcon className="size-10 animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />; // renders whichever child route matched
};

export default ProtectedRoute;