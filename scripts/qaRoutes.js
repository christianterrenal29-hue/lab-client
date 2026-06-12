import fs from 'node:fs';

const app = fs.readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
const sidebar = fs.readFileSync(new URL('../src/components/layout/Sidebar.jsx', import.meta.url), 'utf8');
const authContext = fs.readFileSync(new URL('../src/context/AuthContext.jsx', import.meta.url), 'utf8');
const reportsPage = fs.readFileSync(new URL('../src/pages/admin/ReportsPage.jsx', import.meta.url), 'utf8');
const borrowingPage = fs.readFileSync(new URL('../src/pages/shared/BorrowingPage.jsx', import.meta.url), 'utf8');
const maintenancePage = fs.readFileSync(new URL('../src/pages/shared/MaintenancePage.jsx', import.meta.url), 'utf8');

const requiredRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/admin/dashboard',
  '/admin/inventory',
  '/admin/inventory/new',
  '/admin/inventory/:id',
  '/admin/inventory/:id/edit',
  '/admin/users',
  '/admin/laboratories',
  '/admin/borrowing',
  '/admin/maintenance',
  '/admin/reports',
  '/staff/dashboard',
  '/staff/inventory',
  '/staff/borrowing',
  '/staff/maintenance',
  '/student/dashboard',
  '/student/borrow',
  '/student/history',
];

const sidebarLinks = [
  '/admin/dashboard',
  '/admin/inventory',
  '/admin/users',
  '/admin/laboratories',
  '/admin/borrowing',
  '/admin/maintenance',
  '/admin/reports',
  '/staff/dashboard',
  '/staff/inventory',
  '/staff/borrowing',
  '/staff/maintenance',
  '/student/dashboard',
  '/student/borrow',
  '/student/history',
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

for (const route of requiredRoutes) {
  assert(app.includes(`path="${route}"`), `Missing route in App.jsx: ${route}`);
}

for (const link of sidebarLinks) {
  assert(sidebar.includes(`path: '${link}'`), `Missing sidebar link: ${link}`);
}

assert(app.includes('function ProtectedRoute'), 'ProtectedRoute is missing');
assert(app.includes('function RoleRoute'), 'RoleRoute is missing');
assert(app.includes("roles={['admin']}"), 'Admin role guard is missing');
assert(app.includes("roles={['staff']}"), 'Staff role guard is missing');
assert(app.includes("roles={['student']}"), 'Student role guard is missing');
assert(sidebar.includes('logout'), 'Sidebar logout button is missing');
assert(authContext.includes("localStorage.removeItem('token')"), 'Logout must clear token');
assert(authContext.includes("navigate('/login')"), 'Logout must navigate to login');
assert(reportsPage.includes('window.print()'), 'Reports printable view is missing');
assert(reportsPage.includes('Export CSV'), 'Reports CSV export is missing');
assert(reportsPage.includes('startDate'), 'Reports date filter is missing');
assert(borrowingPage.includes("openAction(record, 'approve')"), 'Borrow approve confirmation is missing');
assert(borrowingPage.includes("openAction(record, 'reject')"), 'Borrow reject confirmation is missing');
assert(borrowingPage.includes('conditionOnReturn'), 'Borrow return condition flow is missing');
assert(maintenancePage.includes("openAction(record, 'status', 'Completed')"), 'Maintenance completion confirmation is missing');
assert(maintenancePage.includes("openAction(record, 'delete')"), 'Maintenance delete confirmation is missing');

console.log('Frontend route QA passed');
