
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
export const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const client = useAppSelector((state) => state.auth.client);
  const  isAdmin  = client?.role === "admin";
  return isAdmin ? children : <Navigate to="/" replace />;
};