import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import { PageLoader } from '../components/ui/Spinner';

export default function DashboardLayout({ allowedRoles }) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Redirect to appropriate dashboard based on role
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user?.role === 'staff') {
      return <Navigate to="/staff/dashboard" replace />;
    } else {
      return <Navigate to="/student/dashboard" replace />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="pl-64">
        <Navbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
