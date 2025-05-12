import { Navigate } from 'react-router-dom';
import { useClientAuth } from '../contexts/ClientAuthContext';

// Component to protect client routes from unauthorized access
const ProtectedClientRoute = ({ children }) => {
  const { client, loading } = useClientAuth();

  // Show nothing while checking authentication
  if (loading) {
    return null;
  }

  // Redirect to login if not authenticated
  if (!client) {
    return <Navigate to="/client/login" replace />;
  }

  return children;
};

export default ProtectedClientRoute;