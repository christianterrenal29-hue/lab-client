import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Users,
  Building2,
  ClipboardList,
  Wrench,
  FileText,
  QrCode,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  History,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/helpers';

const adminNavItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/inventory', label: 'Inventory', icon: Package },
  { path: '/admin/inventory/scan', label: 'QR Scanner', icon: QrCode },
  { path: '/admin/users', label: 'Users', icon: Users },
  { path: '/admin/laboratories', label: 'Laboratories', icon: Building2 },
  { path: '/admin/borrowing', label: 'Borrowing', icon: ClipboardList },
  { path: '/admin/maintenance', label: 'Maintenance', icon: Wrench },
  { path: '/admin/reports', label: 'Reports', icon: FileText },
  { path: '/admin/activity-logs', label: 'Activity Logs', icon: ShieldCheck },
];

const staffNavItems = [
  { path: '/staff/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/staff/inventory', label: 'Inventory', icon: Package },
  { path: '/staff/inventory/scan', label: 'QR Scanner', icon: QrCode },
  { path: '/staff/borrowing', label: 'Borrowing', icon: ClipboardList },
  { path: '/staff/maintenance', label: 'Maintenance', icon: Wrench },
  { path: '/staff/reports', label: 'Reports', icon: FileText },
];

const studentNavItems = [
  { path: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/student/borrow', label: 'Borrow Equipment', icon: ClipboardList },
  { path: '/student/history', label: 'Borrow History', icon: History },
];

export default function Sidebar({ collapsed, mobileOpen, onToggleCollapsed, onCloseMobile }) {
  const { user } = useAuth();
  const location = useLocation();

  const navItems =
    user?.role === 'admin'
      ? adminNavItems
      : user?.role === 'staff'
      ? staffNavItems
      : studentNavItems;

  return (
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
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
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
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
    </>
  );
}
