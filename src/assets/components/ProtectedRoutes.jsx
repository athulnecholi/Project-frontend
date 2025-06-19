import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.user);
  return token ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
