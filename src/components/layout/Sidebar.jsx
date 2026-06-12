import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Users,
  Building2,
  ClipboardList,
  Wrench,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  GraduationCap,
  History,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/helpers';

const adminNavItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/inventory', label: 'Inventory', icon: Package },
  { path: '/admin/users', label: 'Users', icon: Users },
  { path: '/admin/laboratories', label: 'Laboratories', icon: Building2 },
  { path: '/admin/borrowing', label: 'Borrowing', icon: ClipboardList },
  { path: '/admin/maintenance', label: 'Maintenance', icon: Wrench },
  { path: '/admin/reports', label: 'Reports', icon: FileText },
];

const staffNavItems = [
  { path: '/staff/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/staff/inventory', label: 'Inventory', icon: Package },
  { path: '/staff/borrowing', label: 'Borrowing', icon: ClipboardList },
  { path: '/staff/maintenance', label: 'Maintenance', icon: Wrench },
];

const studentNavItems = [
  { path: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/student/borrow', label: 'Borrow Equipment', icon: ClipboardList },
  { path: '/student/history', label: 'Borrow History', icon: History },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems =
    user?.role === 'admin'
      ? adminNavItems
      : user?.role === 'staff'
      ? staffNavItems
      : studentNavItems;

  return (
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
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
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
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
