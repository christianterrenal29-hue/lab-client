import { useState, useRef, useEffect } from 'react';
<<<<<<< HEAD
import { Bell, Moon, Sun, ChevronDown, LogOut, Menu } from 'lucide-react';
=======
import { Bell, Moon, Sun, User, ChevronDown, Settings, LogOut } from 'lucide-react';
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { getInitials, capitalizeFirst } from '../../utils/helpers';

<<<<<<< HEAD
export default function Navbar({ onMenuClick }) {
=======
export default function Navbar() {
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
<<<<<<< HEAD
    <header className="sticky top-0 z-30 h-16 bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side - Page title placeholder */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-primary-700 transition-colors hover:bg-primary-50 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <img src="/toplink-logo.jpg" alt="Top Link logo" className="h-10 w-10 rounded-full object-cover border border-school-gold lg:hidden" />
          <div>
          <h1 className="text-lg font-semibold text-school-dark dark:text-white">
            Top Link Global College
          </h1>
          <p className="text-sm text-primary-700 dark:text-gray-400">
            Laboratory Inventory System
          </p>
          </div>
=======
    <header className="sticky top-0 z-30 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side - Page title placeholder */}
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Top Link Global College
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Laboratory Inventory System
          </p>
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
<<<<<<< HEAD
            className="p-2 rounded-lg text-primary-700 hover:bg-primary-50 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
=======
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Notifications */}
          <button
<<<<<<< HEAD
            className="p-2 rounded-lg text-primary-700 hover:bg-primary-50 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-school-gold rounded-full" />
=======
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
          </button>

          {/* User dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
<<<<<<< HEAD
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-medium">
=======
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-medium">
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
                {getInitials(user?.firstName, user?.lastName)}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {capitalizeFirst(user?.role)}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
<<<<<<< HEAD
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-300 dark:border-gray-700 py-1 animate-fade-in">
                <div className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
=======
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 py-1 animate-fade-in">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
