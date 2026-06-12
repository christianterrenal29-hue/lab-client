import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date, options = {}) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  });
}

export function formatDateTime(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getStatusColor(status) {
  const colors = {
    // Inventory status
    Available: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Borrowed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Under Maintenance': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    Damaged: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    Missing: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',

    // Borrow status
    Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    Approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    Returned: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    Overdue: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',

    // Maintenance status
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    Completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',

    // Laboratory status
    Active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',

    // Priority
    Low: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    High: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    Critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',

    // Condition
    New: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Good: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    Fair: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    Poor: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
}

export function truncateText(text, maxLength = 50) {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

export function capitalizeFirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getInitials(firstName, lastName) {
  const first = firstName?.charAt(0) || '';
  const last = lastName?.charAt(0) || '';
  return (first + last).toUpperCase();
}
