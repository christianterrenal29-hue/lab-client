import fs from 'node:fs';

const app = fs.readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
const landingPage = fs.readFileSync(new URL('../src/pages/LandingPage.jsx', import.meta.url), 'utf8');
const sidebar = fs.readFileSync(new URL('../src/components/layout/Sidebar.jsx', import.meta.url), 'utf8');
const navbar = fs.readFileSync(new URL('../src/components/layout/Navbar.jsx', import.meta.url), 'utf8');
const authContext = fs.readFileSync(new URL('../src/context/AuthContext.jsx', import.meta.url), 'utf8');
const loginPage = fs.readFileSync(new URL('../src/pages/auth/LoginPage.jsx', import.meta.url), 'utf8');
const reportsPage = fs.readFileSync(new URL('../src/pages/admin/ReportsPage.jsx', import.meta.url), 'utf8');
const borrowingPage = fs.readFileSync(new URL('../src/pages/shared/BorrowingPage.jsx', import.meta.url), 'utf8');
const maintenancePage = fs.readFileSync(new URL('../src/pages/shared/MaintenancePage.jsx', import.meta.url), 'utf8');
const inventoryForm = fs.readFileSync(new URL('../src/pages/admin/InventoryForm.jsx', import.meta.url), 'utf8');
const inventoryDetails = fs.readFileSync(new URL('../src/pages/admin/InventoryDetails.jsx', import.meta.url), 'utf8');
const scannerPage = fs.readFileSync(new URL('../src/pages/shared/QRScannerPage.jsx', import.meta.url), 'utf8');
const activityLogsPage = fs.readFileSync(new URL('../src/pages/admin/ActivityLogsPage.jsx', import.meta.url), 'utf8');
const laboratoriesPage = fs.readFileSync(new URL('../src/pages/admin/LaboratoriesPage.jsx', import.meta.url), 'utf8');

const requiredRoutes = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/admin/dashboard',
  '/admin/inventory',
  '/admin/inventory/new',
  '/admin/inventory/:id',
  '/admin/inventory/:id/edit',
  '/admin/inventory/scan',
  '/admin/users',
  '/admin/laboratories',
  '/admin/borrowing',
  '/admin/maintenance',
  '/admin/reports',
  '/admin/activity-logs',
  '/staff/dashboard',
  '/staff/inventory',
  '/staff/inventory/:id',
  '/staff/inventory/scan',
  '/staff/borrowing',
  '/staff/maintenance',
  '/staff/reports',
  '/inventory/:id',
  '/student/dashboard',
  '/student/borrow',
  '/student/history',
];

const sidebarLinks = [
  '/admin/dashboard',
  '/admin/inventory',
  '/admin/inventory/scan',
  '/admin/users',
  '/admin/laboratories',
  '/admin/borrowing',
  '/admin/maintenance',
  '/admin/reports',
  '/admin/activity-logs',
  '/staff/dashboard',
  '/staff/inventory',
  '/staff/inventory/scan',
  '/staff/borrowing',
  '/staff/maintenance',
  '/staff/reports',
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
assert(app.includes('LandingPage'), 'Landing page route is missing');
assert(landingPage.includes('Laboratory Inventory and Tracking System'), 'Landing page system title is missing');
assert(landingPage.includes('Top Link Global College'), 'Landing page school name is missing');
assert(landingPage.includes('A school-based system for monitoring laboratory equipment, borrowing, maintenance, QR tracking, and reports.'), 'Landing page description is missing');
assert(landingPage.includes('/toplink-logo.jpg'), 'Landing page logo is missing');
assert(landingPage.includes('View Features'), 'Landing page feature button is missing');
assert(landingPage.includes('Reports Generation'), 'Landing reports feature is missing');
assert(landingPage.includes('Activity Logs'), 'Landing activity logs feature is missing');
assert(landingPage.includes('About the System'), 'Landing about section is missing');
assert(landingPage.includes('User Roles'), 'Landing user roles section is missing');
assert(landingPage.includes('Administrator'), 'Landing administrator role is missing');
assert(landingPage.includes('Staff'), 'Landing staff role is missing');
assert(landingPage.includes('Student'), 'Landing student role is missing');
assert(loginPage.includes('/toplink-logo.jpg'), 'Login page logo is missing');
assert(sidebar.includes('/toplink-logo.jpg'), 'Sidebar logo is missing');
assert(navbar.includes('/toplink-logo.jpg'), 'Navbar logo is missing');
assert(!sidebar.includes('logout'), 'Sidebar logout button should not be present');
assert(!sidebar.includes('LogOut'), 'Sidebar logout icon should not be present');
assert(navbar.includes('logout'), 'Navbar logout handler is missing');
assert(navbar.includes('LogOut'), 'Navbar logout icon is missing');
assert(authContext.includes("localStorage.removeItem('token')"), 'Logout must clear token');
assert(authContext.includes("navigate('/login')"), 'Logout must navigate to login');
assert(reportsPage.includes('window.print()'), 'Reports printable view is missing');
assert(reportsPage.includes('Export CSV'), 'Reports CSV export is missing');
assert(reportsPage.includes('startDate'), 'Reports date filter is missing');
assert(reportsPage.includes('category'), 'Reports category filter is missing');
assert(reportsPage.includes('Overdue Borrow Report'), 'Overdue borrow report is missing');
assert(reportsPage.includes('Low Stock Report'), 'Low stock report is missing');
assert(borrowingPage.includes("openAction(record, 'approve')"), 'Borrow approve confirmation is missing');
assert(borrowingPage.includes("openAction(record, 'reject')"), 'Borrow reject confirmation is missing');
assert(borrowingPage.includes('conditionOnReturn'), 'Borrow return condition flow is missing');
assert(borrowingPage.includes('quantityBorrowed'), 'Borrow quantity flow is missing');
assert(borrowingPage.includes('Borrowing Slip'), 'Borrowing slip is missing');
assert(maintenancePage.includes("openAction(record, 'status', 'Completed')"), 'Maintenance completion confirmation is missing');
assert(maintenancePage.includes("openAction(record, 'delete')"), 'Maintenance delete confirmation is missing');
assert(maintenancePage.includes('nextMaintenanceDate'), 'Maintenance reminder date is missing');
assert(inventoryForm.includes('minimumStock'), 'Inventory minimum stock field is missing');
assert(inventoryForm.includes('imageUrl'), 'Inventory photo URL field is missing');
assert(inventoryForm.includes('cabinet'), 'Inventory cabinet field is missing');
assert(inventoryDetails.includes('QRCodeSVG'), 'Inventory QR view is missing');
assert(inventoryDetails.includes('Print QR'), 'Inventory QR print button is missing');
assert(scannerPage.includes('BrowserQRCodeReader'), 'QR scanner ZXing camera support is missing');
assert(scannerPage.includes('Camera scanner works only on localhost or HTTPS'), 'QR scanner secure-context instruction is missing');
assert(scannerPage.includes('NotAllowedError'), 'QR scanner permission denied handling is missing');
assert(scannerPage.includes('NotFoundError'), 'QR scanner no-camera handling is missing');
assert(activityLogsPage.includes('Activity Logs'), 'Activity logs page is missing');
assert(activityLogsPage.includes('/activity-logs'), 'Activity logs page must use admin-only activity logs API');
assert(!activityLogsPage.includes('/dashboard/activities?limit=100'), 'Activity logs page should not use dashboard activities API');
assert(laboratoriesPage.includes('No Laboratories Found'), 'Laboratories empty state is missing');
assert(laboratoriesPage.includes('Add Laboratory'), 'Laboratories add button is missing');
assert(laboratoriesPage.includes("api.post('/laboratories'"), 'Laboratories create API call is missing');
assert(laboratoriesPage.includes('api.put(`/laboratories/${selectedLab._id}`'), 'Laboratories update API call is missing');
assert(laboratoriesPage.includes('api.delete(`/laboratories/${deleteTarget._id}`'), 'Laboratories delete API call is missing');
assert(laboratoriesPage.includes('openView(lab)'), 'Laboratories view action is missing');
assert(laboratoriesPage.includes('border-gray-300'), 'Laboratory cards must use stronger light-mode borders');
assert(laboratoriesPage.includes('dark:border-gray-700'), 'Laboratory cards must use stronger dark-mode borders');

console.log('Frontend route QA passed');
