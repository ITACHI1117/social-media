import { Navigate } from "react-router";

const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  return !!token;
};

export const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
