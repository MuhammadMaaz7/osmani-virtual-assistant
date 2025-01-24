import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  // Redirect if not authenticated or not an admin
  if (!isAuthenticated || !user?.roles?.includes("admin")) {
    return <Navigate to="/" replace />;
  }

  return children; // Allow access if user is an admin
};

export default ProtectedAdminRoute;