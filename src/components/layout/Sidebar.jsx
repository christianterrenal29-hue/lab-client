<<<<<<< HEAD
=======
import { useState } from 'react';
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Users,
  Building2,
  ClipboardList,
  Wrench,
  FileText,
<<<<<<< HEAD
  QrCode,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
=======
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  GraduationCap,
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
  History,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/helpers';

const adminNavItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/inventory', label: 'Inventory', icon: Package },
<<<<<<< HEAD
  { path: '/admin/inventory/scan', label: 'QR Scanner', icon: QrCode },
=======
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
  { path: '/admin/users', label: 'Users', icon: Users },
  { path: '/admin/laboratories', label: 'Laboratories', icon: Building2 },
  { path: '/admin/borrowing', label: 'Borrowing', icon: ClipboardList },
  { path: '/admin/maintenance', label: 'Maintenance', icon: Wrench },
  { path: '/admin/reports', label: 'Reports', icon: FileText },
<<<<<<< HEAD
  { path: '/admin/activity-logs', label: 'Activity Logs', icon: ShieldCheck },
=======
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
];

const staffNavItems = [
  { path: '/staff/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/staff/inventory', label: 'Inventory', icon: Package },
<<<<<<< HEAD
  { path: '/staff/inventory/scan', label: 'QR Scanner', icon: QrCode },
  { path: '/staff/borrowing', label: 'Borrowing', icon: ClipboardList },
  { path: '/staff/maintenance', label: 'Maintenance', icon: Wrench },
  { path: '/staff/reports', label: 'Reports', icon: FileText },
=======
  { path: '/staff/borrowing', label: 'Borrowing', icon: ClipboardList },
  { path: '/staff/maintenance', label: 'Maintenance', icon: Wrench },
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
];

const studentNavItems = [
  { path: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/student/borrow', label: 'Borrow Equipment', icon: ClipboardList },
  { path: '/student/history', label: 'Borrow History', icon: History },
];

<<<<<<< HEAD
export default function Sidebar({ collapsed, mobileOpen, onToggleCollapsed, onCloseMobile }) {
  const { user } = useAuth();
=======
export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
  const location = useLocation();

  const navItems =
    user?.role === 'admin'
      ? adminNavItems
      : user?.role === 'staff'
      ? staffNavItems
      : studentNavItems;

  return (
<<<<<<< HEAD
    <>
    <button
      type="button"
      className={cn(
        'fixed inset-0 z-30 bg-gray-950/50 transition-opacity duration-300 lg:hidden',
        mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
      onClick={onCloseMobile}
      aria-label="Close sidebar"
    />
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col border-r bg-school-dark text-white shadow-xl transition-[transform,width] duration-300 ease-in-out',
        'border-school-dark dark:border-gray-700',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        collapsed ? 'w-72 lg:w-20' : 'w-72 lg:w-64'
      )}
    >
      {/* Logo */}
      <div className={cn('flex h-16 items-center border-b border-white/10 px-4', collapsed ? 'lg:justify-center' : 'justify-between')}>
        <div className="flex min-w-0 items-center gap-2">
          <img src="/toplink-logo.jpg" alt="Top Link logo" className="h-9 w-9 flex-shrink-0 rounded-full border border-school-gold bg-white object-contain p-0.5" />
          <div className={cn('min-w-0 transition-opacity duration-200', collapsed && 'lg:sr-only lg:w-0 lg:opacity-0')}>
              <span className="block font-semibold text-white">Top Link</span>
              <span className="block text-xs text-primary-100">Lab System</span>
          </div>
        </div>
=======
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">
              Lab System
            </span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center mx-auto">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
        )}
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
<<<<<<< HEAD
                  onClick={onCloseMobile}
                  className={cn(
                    'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    collapsed && 'lg:justify-center lg:px-2',
                    isActive
                      ? 'bg-school-gold text-school-dark'
                      : 'text-primary-50 hover:bg-white/10'
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className={cn('truncate transition-opacity duration-200', collapsed && 'lg:sr-only lg:w-0 lg:opacity-0')}>
                    {item.label}
                  </span>
                  {collapsed && (
                    <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-950 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block">
                      {item.label}
                    </span>
                  )}
=======
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
<<<<<<< HEAD
      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={onToggleCollapsed}
          className={cn(
            'hidden w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-primary-100 transition-colors hover:bg-white/10 lg:flex',
            collapsed && 'justify-center px-2'
          )}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <>
              <ChevronLeft className="h-5 w-5" />
=======
      <div className="border-t border-gray-200 dark:border-gray-800 p-3">
        <button
          onClick={logout}
          className={cn(
            'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors',
            collapsed && 'justify-center'
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mt-1',
            collapsed && 'justify-center'
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
<<<<<<< HEAD
    </>
=======
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
  );
}
