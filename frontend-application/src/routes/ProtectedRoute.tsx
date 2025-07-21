import type { JSX } from "react";
import { useAuth } from "../auth/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const hasToken = !!localStorage.getItem("AuthToken");
  return isAuthenticated && hasToken ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
