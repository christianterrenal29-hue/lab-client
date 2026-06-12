import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import api from '../../services/api';
import StatCard from '../../components/charts/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import { formatDate } from '../../utils/helpers';

export default function StudentDashboard() {
  const [stats, setStats] = useState(null);
  const [recentBorrows, setRecentBorrows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, borrowsRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/borrow?limit=5'),
      ]);
      setStats(statsRes.data);
      setRecentBorrows(borrowsRes.data.records || []);
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Track your borrowing requests and history
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="My Borrow Requests"
          value={stats?.myBorrowRequests || 0}
          icon={ClipboardList}
          color="primary"
        />
        <StatCard
          title="Pending Requests"
          value={stats?.myPendingRequests || 0}
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Active Borrows"
          value={stats?.myActiveBorrows || 0}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Overdue Items"
          value={stats?.myOverdueItems || 0}
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <Card.Header>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Quick Actions
          </h3>
        </Card.Header>
        <Card.Body>
          <div className="flex flex-wrap gap-4">
            <Link to="/student/borrow">
              <Button>
                <ClipboardList className="w-4 h-4 mr-2" />
                New Borrow Request
              </Button>
            </Link>
            <Link to="/student/history">
              <Button variant="outline">View Borrow History</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>

      {/* Recent Borrow Requests */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Borrow Requests
            </h3>
            <Link
              to="/student/history"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              View all
            </Link>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          {recentBorrows.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentBorrows.map((record) => (
                <div
                  key={record._id}
                  className="flex items-center gap-4 px-6 py-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {record.item?.name || 'Unknown Item'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {record.borrowId} - Expected return: {formatDate(record.expectedReturnDate)}
                    </p>
                  </div>
                  <Badge variant={record.status}>{record.status}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
              <p>No borrow requests yet</p>
              <Link
                to="/student/borrow"
                className="text-primary-600 hover:text-primary-700 text-sm mt-2"
              >
                Make your first request
              </Link>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
