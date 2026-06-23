<<<<<<< HEAD
import { Outlet, Navigate, useLocation } from 'react-router-dom';
=======
import { Outlet, Navigate } from 'react-router-dom';
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
import { useAuth } from '../context/AuthContext';
import { PageLoader } from '../components/ui/Spinner';

export default function AuthLayout() {
  const { isAuthenticated, loading, user } = useAuth();
<<<<<<< HEAD
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
=======
>>>>>>> 6f02213f17862507603ace70185a986836e978b9

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
<<<<<<< HEAD
    <div
      className="min-h-screen bg-school-light dark:bg-gray-950 flex items-center justify-center p-4"
      style={
        isLoginPage
          ? {
              backgroundImage:
                'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url("/toplink-building.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }
          : undefined
      }
    >
=======
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
      <Outlet />
    </div>
  );
}
