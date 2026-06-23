import { useEffect, useMemo, useState } from 'react';
import api from '../../services/api';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Select from '../../components/ui/Select';
import Spinner from '../../components/ui/Spinner';
import { formatDateTime } from '../../utils/helpers';

export default function ActivityLogsPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ module: '', action: '' });

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await api.get('/activity-logs?limit=100');
        setActivities(response.data || []);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const filteredActivities = useMemo(
    () =>
      activities.filter((activity) => {
        if (filters.module && activity.module !== filters.module) return false;
        if (filters.action && activity.action !== filters.action) return false;
        return true;
      }),
    [activities, filters]
  );

  const modules = [...new Set(activities.map((activity) => activity.module).filter(Boolean))];
  const actions = [...new Set(activities.map((activity) => activity.action).filter(Boolean))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Activity Logs</h1>
        <p className="text-gray-500 dark:text-gray-400">Admin audit trail for important system actions.</p>
      </div>

      <Card>
        <Card.Body>
          <div className="mb-4 flex flex-wrap gap-3">
            <Select
              label="Module"
              value={filters.module}
              onChange={(event) => setFilters((prev) => ({ ...prev, module: event.target.value }))}
            >
              <option value="">All Modules</option>
              {modules.map((module) => (
                <option key={module} value={module}>{module}</option>
              ))}
            </Select>
            <Select
              label="Action"
              value={filters.action}
              onChange={(event) => setFilters((prev) => ({ ...prev, action: event.target.value }))}
            >
              <option value="">All Actions</option>
              {actions.map((action) => (
                <option key={action} value={action}>{action}</option>
              ))}
            </Select>
          </div>

          {loading ? (
            <div className="flex h-40 items-center justify-center"><Spinner /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="px-3 py-2">User</th>
                    <th className="px-3 py-2">Role</th>
                    <th className="px-3 py-2">Action</th>
                    <th className="px-3 py-2">Module</th>
                    <th className="px-3 py-2">Timestamp</th>
                    <th className="px-3 py-2">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {filteredActivities.map((activity) => (
                    <tr key={activity._id}>
                      <td className="px-3 py-3">
                        {activity.user ? `${activity.user.firstName} ${activity.user.lastName}` : 'System'}
                      </td>
                      <td className="px-3 py-3">{activity.user?.role || '-'}</td>
                      <td className="px-3 py-3"><Badge variant={activity.action}>{activity.action}</Badge></td>
                      <td className="px-3 py-3">{activity.module}</td>
                      <td className="px-3 py-3">{formatDateTime(activity.createdAt)}</td>
                      <td className="px-3 py-3">{activity.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredActivities.length === 0 && (
                <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">No activity logs found.</p>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
