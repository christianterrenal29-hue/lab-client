import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';
import InventoryDetails from './InventoryDetails';
<<<<<<< HEAD
import { useAuth } from '../../context/AuthContext';
=======
>>>>>>> 6f02213f17862507603ace70185a986836e978b9

export default function InventoryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
<<<<<<< HEAD
  const { user } = useAuth();
=======
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
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
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{item.name}</h1>
            <Badge variant={item.status}>{item.status}</Badge>
          </div>
          <p className="text-gray-500 dark:text-gray-400">{item.itemId || item.category}</p>
        </div>
<<<<<<< HEAD
        {user?.role === 'admin' && (
          <Button onClick={() => navigate(`/admin/inventory/${id}/edit`)}>
            Edit Item
          </Button>
        )}
=======
        <Button onClick={() => navigate(`/admin/inventory/${id}/edit`)}>
          Edit Item
        </Button>
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
      </div>
      <Card>
        <Card.Body>
          <InventoryDetails item={item} />
        </Card.Body>
      </Card>
    </div>
  );
}
