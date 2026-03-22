import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAdmin = localStorage.getItem("isAdmin"); // check admin login
  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}