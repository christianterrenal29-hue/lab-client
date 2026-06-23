import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import { useAuth } from './context/AuthContext';
import { PageLoader } from './components/ui/Spinner';

const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
<<<<<<< HEAD
const LandingPage = lazy(() => import('./pages/LandingPage'));
=======
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const InventoryPage = lazy(() => import('./pages/admin/InventoryPage'));
const InventoryCreatePage = lazy(() => import('./pages/admin/InventoryCreatePage'));
const InventoryDetailPage = lazy(() => import('./pages/admin/InventoryDetailPage'));
const InventoryEditPage = lazy(() => import('./pages/admin/InventoryEditPage'));
const UsersPage = lazy(() => import('./pages/admin/UsersPage'));
const LaboratoriesPage = lazy(() => import('./pages/admin/LaboratoriesPage'));
const ReportsPage = lazy(() => import('./pages/admin/ReportsPage'));
<<<<<<< HEAD
const ActivityLogsPage = lazy(() => import('./pages/admin/ActivityLogsPage'));
const QRScannerPage = lazy(() => import('./pages/shared/QRScannerPage'));
=======
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
const StaffDashboard = lazy(() => import('./pages/staff/Dashboard'));
const StudentDashboard = lazy(() => import('./pages/student/Dashboard'));
const BorrowingPage = lazy(() => import('./pages/shared/BorrowingPage'));
const MaintenancePage = lazy(() => import('./pages/shared/MaintenancePage'));

function dashboardPathFor(user) {
  if (user?.role === 'admin') return '/admin/dashboard';
  if (user?.role === 'staff') return '/staff/dashboard';
  return '/student/dashboard';
}

<<<<<<< HEAD
=======
function HomeRedirect() {
  const { loading, user, isAuthenticated } = useAuth();

  if (loading) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Navigate to={dashboardPathFor(user)} replace />;
}

>>>>>>> 6f02213f17862507603ace70185a986836e978b9
function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) return <PageLoader />;
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function RoleRoute({ roles, children }) {
  const { user } = useAuth();

  if (!roles.includes(user?.role)) {
    return <Navigate to={dashboardPathFor(user)} replace />;
  }

  return children;
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<LandingPage />} />
=======
        <Route path="/" element={<HomeRedirect />} />
>>>>>>> 6f02213f17862507603ace70185a986836e978b9

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
<<<<<<< HEAD
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/inventory/:id"
            element={
              <RoleRoute roles={['admin', 'staff', 'student']}>
                <InventoryDetailPage />
              </RoleRoute>
            }
          />
        </Route>

        <Route
          element={
            <ProtectedRoute>
=======
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
              <RoleRoute roles={['admin']}>
                <DashboardLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/inventory" element={<InventoryPage />} />
          <Route path="/admin/inventory/new" element={<InventoryCreatePage />} />
          <Route path="/admin/inventory/:id" element={<InventoryDetailPage />} />
          <Route path="/admin/inventory/:id/edit" element={<InventoryEditPage />} />
<<<<<<< HEAD
          <Route path="/admin/inventory/scan" element={<QRScannerPage />} />
=======
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/laboratories" element={<LaboratoriesPage />} />
          <Route path="/admin/borrowing" element={<BorrowingPage mode="manage" />} />
          <Route path="/admin/maintenance" element={<MaintenancePage />} />
          <Route path="/admin/reports" element={<ReportsPage />} />
<<<<<<< HEAD
          <Route path="/admin/activity-logs" element={<ActivityLogsPage />} />
=======
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <RoleRoute roles={['staff']}>
                <DashboardLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/staff/inventory" element={<InventoryPage />} />
<<<<<<< HEAD
          <Route path="/staff/inventory/:id" element={<InventoryDetailPage />} />
          <Route path="/staff/inventory/scan" element={<QRScannerPage />} />
          <Route path="/staff/borrowing" element={<BorrowingPage mode="manage" />} />
          <Route path="/staff/maintenance" element={<MaintenancePage />} />
          <Route path="/staff/reports" element={<ReportsPage />} />
=======
          <Route path="/staff/borrowing" element={<BorrowingPage mode="manage" />} />
          <Route path="/staff/maintenance" element={<MaintenancePage />} />
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <RoleRoute roles={['student']}>
                <DashboardLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/borrow" element={<BorrowingPage mode="request" />} />
          <Route path="/student/history" element={<BorrowingPage mode="history" />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
