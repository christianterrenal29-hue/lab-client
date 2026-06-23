import { useState, useEffect } from 'react';
import {
  Package,
  Users,
  Building2,
  ClipboardList,
  Wrench,
  AlertTriangle,
  Clock,
  CheckCircle,
  Bell,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import api from '../../services/api';
import StatCard from '../../components/charts/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import { formatDateTime } from '../../utils/helpers';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6b7280'];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [inventoryOverview, setInventoryOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, activitiesRes, overviewRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/dashboard/activities?limit=5'),
        api.get('/dashboard/inventory-overview'),
      ]);

      setStats(statsRes.data);
      setActivities(activitiesRes.data);
      setInventoryOverview(overviewRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  const statusData = stats?.inventoryByStatus?.map((item) => ({
    name: item._id,
    value: item.count,
  })) || [];

  const categoryData = stats?.inventoryByCategory?.map((item) => ({
    name: item._id,
    count: item.count,
  })) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Overview of the laboratory inventory system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Inventory"
          value={stats?.totalInventory || 0}
          icon={Package}
          color="primary"
        />
        <StatCard
          title="Available Items"
          value={stats?.availableItems || 0}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Borrowed Items"
          value={stats?.borrowedItems || 0}
          icon={ClipboardList}
          color="blue"
        />
        <StatCard
          title="Pending Requests"
          value={stats?.pendingBorrowRequests || 0}
          icon={Clock}
          color="yellow"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Low Stock Items"
          value={stats?.lowStockItems || 0}
          icon={AlertTriangle}
          color="red"
        />
        <StatCard
          title="Overdue Returns"
          value={stats?.overdueItems || 0}
          icon={AlertTriangle}
          color="red"
        />
        <StatCard
          title="Maintenance Due"
          value={stats?.maintenanceDue || 0}
          icon={Wrench}
          color="purple"
        />
      </div>

      <Card>
        <Card.Header>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Center</h3>
          </div>
        </Card.Header>
        <Card.Body>
          {stats?.alerts?.length ? (
            <div className="grid gap-3 md:grid-cols-4">
              {stats.alerts.map((alert) => (
                <div key={alert.label} className="rounded-lg border border-gray-300 p-3 shadow-sm dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{alert.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{alert.count}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No active alerts.</p>
          )}
        </Card.Body>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory by Category */}
        <Card>
          <Card.Header>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Inventory by Category
            </h3>
          </Card.Header>
          <Card.Body>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                No inventory data available
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Inventory by Status */}
        <Card>
          <Card.Header>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Inventory by Status
            </h3>
          </Card.Header>
          <Card.Body>
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                No status data available
              </div>
            )}
          </Card.Body>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <DashboardList title="Low Stock List" items={stats?.lowStockList} render={(item) => (
          <>
            <span>{item.name}</span>
            <Badge variant="Low Stock">{item.quantity}/{item.minimumStock}</Badge>
          </>
        )} />
        <DashboardList title="Maintenance Due" items={stats?.maintenanceDueList} render={(item) => (
          <>
            <span>{item.name}</span>
            <span className="text-xs text-gray-500">{formatDateTime(item.nextMaintenanceDate)}</span>
          </>
        )} />
        <DashboardList title="Most Borrowed Items" items={stats?.mostBorrowedItems} render={(item) => (
          <>
            <span>{item.name}</span>
            <Badge variant="Borrowed">{item.count}</Badge>
          </>
        )} />
      </div>

      {/* Recent Activities */}
      <Card>
        <Card.Header>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activities
          </h3>
        </Card.Header>
        <Card.Body className="p-0">
          {activities.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {activities.map((activity) => (
                <div
                  key={activity._id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      by {activity.user?.firstName} {activity.user?.lastName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={activity.action}>{activity.action}</Badge>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDateTime(activity.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-gray-500">
              No recent activities
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

function DashboardList({ title, items = [], render }) {
  return (
    <Card>
      <Card.Header>
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      </Card.Header>
      <Card.Body className="p-0">
        {items.length ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {items.map((item) => (
              <div key={item._id || item.itemId} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                {render(item)}
              </div>
            ))}
          </div>
        ) : (
          <p className="p-4 text-sm text-gray-500 dark:text-gray-400">No records to show.</p>
        )}
      </Card.Body>
    </Card>
  );
}
