import { Navigate } from "react-router-dom";

const Protected = ({ isAdmin, children }) => {
  if (!isAdmin.isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;
