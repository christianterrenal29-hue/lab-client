import { useEffect, useState } from 'react';
import api from '../../services/api';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';

export default function LaboratoriesPage() {
  const [laboratories, setLaboratories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaboratories = async () => {
      try {
        const response = await api.get('/laboratories?limit=100');
        setLaboratories(response.data.laboratories || []);
      } finally {
        setLoading(false);
      }
    };

    fetchLaboratories();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Laboratories</h1>
        <p className="text-gray-500 dark:text-gray-400">View laboratory rooms and status.</p>
      </div>
      <Card>
        <Card.Body>
          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {laboratories.map((lab) => (
                <div
                  key={lab._id}
                  className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-semibold text-gray-900 dark:text-white">{lab.name}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {lab.building || 'Building'} · Room {lab.roomNumber}
                      </p>
                    </div>
                    <Badge variant={lab.status}>{lab.status}</Badge>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                    Capacity: {lab.capacity || 0}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
