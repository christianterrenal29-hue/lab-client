import { useState, useEffect } from 'react';
import { Package, ClipboardList, Wrench, Clock, AlertTriangle } from 'lucide-react';
import api from '../../services/api';
import StatCard from '../../components/charts/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import { formatDateTime } from '../../utils/helpers';

export default function StaffDashboard() {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, activitiesRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/dashboard/activities?limit=10'),
      ]);
      setStats(statsRes.data);
      setActivities(activitiesRes.data);
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Staff Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage inventory and process requests
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Available Items"
          value={stats?.availableItems || 0}
          icon={Package}
          color="green"
        />
        <StatCard
          title="Low Stock"
          value={stats?.lowStockItems || 0}
          icon={AlertTriangle}
          color="red"
        />
        <StatCard
          title="Pending Requests"
          value={stats?.pendingBorrowRequests || 0}
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Active Maintenance"
          value={stats?.activeMaintenance || 0}
          icon={Wrench}
          color="purple"
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard Alerts</h3>
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
                  className="flex items-center gap-4 px-6 py-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.user?.firstName} {activity.user?.lastName} - {activity.module}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDateTime(activity.createdAt)}
                  </span>
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
