import { useEffect, useState } from 'react';
import api from '../../services/api';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users?limit=100');
        setUsers(response.data.users || []);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
        <p className="text-gray-500 dark:text-gray-400">Review registered system accounts.</p>
      </div>
      <Card>
        <Card.Body>
          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Email</th>
                    <th className="px-3 py-2">Role</th>
                    <th className="px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-3 py-3 font-medium text-gray-900 dark:text-white">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="px-3 py-3 text-gray-600 dark:text-gray-300">{user.email}</td>
                      <td className="px-3 py-3">
                        <Badge variant={user.role}>{user.role}</Badge>
                      </td>
                      <td className="px-3 py-3">{user.isActive ? 'Active' : 'Inactive'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
