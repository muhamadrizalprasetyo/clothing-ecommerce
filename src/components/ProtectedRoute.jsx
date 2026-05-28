import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

/**
 * ProtectedRoute - Redirects unauthenticated users to login
 * Wrap routes that require authentication with this component
 */
export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useStore();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to register, saving the attempted URL for redirect after join
    return <Navigate to="/register" state={{ from: location.pathname }} replace />;
  }

  return children;
};

/**
 * PublicRoute - Redirects authenticated users to home
 * Use for login/register pages to prevent logged-in users from accessing them
 */
export const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useStore();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
