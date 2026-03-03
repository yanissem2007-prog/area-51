import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, allowedRoles }) {
  const { role } = useAuth();
  if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;
  return children;
}

export default ProtectedRoute;
