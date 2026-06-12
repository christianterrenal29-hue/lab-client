import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import InventoryForm from './InventoryForm';

export default function InventoryCreatePage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Inventory Item</h1>
        <p className="text-gray-500 dark:text-gray-400">Create a new laboratory asset.</p>
      </div>
      <Card>
        <Card.Body>
          <InventoryForm
            onSuccess={() => navigate('/admin/inventory')}
            onCancel={() => navigate('/admin/inventory')}
          />
        </Card.Body>
      </Card>
    </div>
  );
}
