import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PageLoader } from '../components/ui/Spinner';

export default function AuthLayout() {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  if (isAuthenticated) {
    // Redirect to appropriate dashboard
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user?.role === 'staff') {
      return <Navigate to="/staff/dashboard" replace />;
    } else {
      return <Navigate to="/student/dashboard" replace />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <Outlet />
    </div>
  );
}
