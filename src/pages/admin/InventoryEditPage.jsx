import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import Card from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';
import InventoryForm from './InventoryForm';

export default function InventoryEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/inventory/${id}`);
        setItem(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!item) {
    return <p className="text-gray-500 dark:text-gray-400">Inventory item not found.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Inventory Item</h1>
        <p className="text-gray-500 dark:text-gray-400">{item.name}</p>
      </div>
      <Card>
        <Card.Body>
          <InventoryForm
            item={item}
            onSuccess={() => navigate(`/admin/inventory/${id}`)}
            onCancel={() => navigate(`/admin/inventory/${id}`)}
          />
        </Card.Body>
      </Card>
    </div>
  );
}
