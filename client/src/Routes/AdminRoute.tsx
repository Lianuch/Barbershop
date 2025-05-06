
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
export const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { isAdmin } = useAppSelector((state) => state.admin);
  return isAdmin ? children : <Navigate to="/" replace />;
};