<<<<<<< HEAD
import { useState } from 'react';
=======
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import { PageLoader } from '../components/ui/Spinner';
<<<<<<< HEAD
import { cn } from '../utils/helpers';

export default function DashboardLayout({ allowedRoles }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
=======

export default function DashboardLayout({ allowedRoles }) {
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
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
<<<<<<< HEAD
    <div className="min-h-screen bg-school-light dark:bg-gray-950">
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onToggleCollapsed={() => setSidebarCollapsed((value) => !value)}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />
      <div
        className={cn(
          'transition-[padding] duration-300 ease-in-out',
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        )}
      >
        <Navbar onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className="p-4 sm:p-6">
=======
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="pl-64">
        <Navbar />
        <main className="p-6">
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
          <Outlet />
        </main>
      </div>
    </div>
  );
}
