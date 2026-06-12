import { useEffect, useState } from 'react';
import api from '../../services/api';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Select from '../../components/ui/Select';
import Spinner from '../../components/ui/Spinner';
import toast from 'react-hot-toast';
import { formatDate } from '../../utils/helpers';

export default function MaintenancePage() {
  const [records, setRecords] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [actionState, setActionState] = useState(null);
  const [formData, setFormData] = useState({
    item: '',
    type: 'Corrective',
    priority: 'Medium',
    description: '',
    technician: '',
  });

  const fetchRecords = async () => {
    const response = await api.get('/maintenance?limit=100');
    setRecords(response.data.records || []);
  };

  useEffect(() => {
    const load = async () => {
      try {
        await Promise.all([
          fetchRecords(),
          api.get('/inventory?limit=100').then((res) => setItems(res.data.items || [])),
        ]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      await api.post('/maintenance', formData);
      toast.success('Maintenance record created');
      setFormData({
        item: '',
        type: 'Corrective',
        priority: 'Medium',
        description: '',
        technician: '',
      });
      await fetchRecords();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create maintenance record');
    } finally {
      setSubmitting(false);
    }
  };

  const openAction = (record, action, status = '') => {
    setActionState({ record, action, status });
  };

  const closeAction = () => {
    setActionState(null);
    setSubmitting(false);
  };

  const submitAction = async () => {
    if (!actionState) return;

    try {
      setSubmitting(true);
      if (actionState.action === 'delete') {
        await api.delete(`/maintenance/${actionState.record._id}`);
        toast.success('Maintenance record deleted');
      } else {
        const payload = { status: actionState.status };
        if (actionState.status === 'Completed') {
          payload.completionDate = new Date().toISOString();
        }
        await api.put(`/maintenance/${actionState.record._id}`, payload);
        toast.success('Maintenance updated');
      }
      closeAction();
      await fetchRecords();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update maintenance');
    } finally {
      setSubmitting(false);
    }
  };

  const actionTitle =
    actionState?.action === 'delete'
      ? 'Delete Maintenance Record'
      : `Set Maintenance to ${actionState?.status}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Maintenance</h1>
        <p className="text-gray-500 dark:text-gray-400">Create and update equipment maintenance.</p>
      </div>

      <Card>
        <Card.Header>
          <h2 className="font-semibold text-gray-900 dark:text-white">New Maintenance Record</h2>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <Select
              label="Item"
              value={formData.item}
              onChange={(event) => setFormData((prev) => ({ ...prev, item: event.target.value }))}
              required
            >
              <option value="">Select item</option>
              {items.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name} ({item.itemId})
                </option>
              ))}
            </Select>
            <Select
              label="Type"
              value={formData.type}
              onChange={(event) => setFormData((prev) => ({ ...prev, type: event.target.value }))}
            >
              <option>Preventive</option>
              <option>Corrective</option>
              <option>Emergency</option>
            </Select>
            <Select
              label="Priority"
              value={formData.priority}
              onChange={(event) => setFormData((prev) => ({ ...prev, priority: event.target.value }))}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </Select>
            <Input
              label="Technician"
              value={formData.technician}
              onChange={(event) => setFormData((prev) => ({ ...prev, technician: event.target.value }))}
            />
            <Input
              label="Description"
              value={formData.description}
              onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
              required
            />
            <div className="md:col-span-2 xl:col-span-5">
              <Button type="submit" loading={submitting}>
                Create Maintenance
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>

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
                    <th className="px-3 py-2">Maintenance ID</th>
                    <th className="px-3 py-2">Item</th>
                    <th className="px-3 py-2">Type</th>
                    <th className="px-3 py-2">Priority</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Completed</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {records.map((record) => (
                    <tr key={record._id}>
                      <td className="px-3 py-3 font-mono text-xs">{record.maintenanceId}</td>
                      <td className="px-3 py-3">{record.item?.name || '-'}</td>
                      <td className="px-3 py-3">{record.type}</td>
                      <td className="px-3 py-3">
                        <Badge variant={record.priority}>{record.priority}</Badge>
                      </td>
                      <td className="px-3 py-3">
                        <Badge variant={record.status}>{record.status}</Badge>
                      </td>
                      <td className="px-3 py-3">{formatDate(record.completionDate) || '-'}</td>
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-2">
                          {record.status === 'Pending' && (
                            <Button size="sm" onClick={() => openAction(record, 'status', 'In Progress')}>
                              Start
                            </Button>
                          )}
                          {record.status !== 'Completed' && record.status !== 'Cancelled' && (
                            <>
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => openAction(record, 'status', 'Completed')}
                              >
                                Complete
                              </Button>
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => openAction(record, 'status', 'Cancelled')}
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                          {['Completed', 'Cancelled'].includes(record.status) && (
                            <Button size="sm" variant="danger" onClick={() => openAction(record, 'delete')}>
                              Delete
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal isOpen={!!actionState} onClose={closeAction} title={actionTitle}>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {actionState?.record?.maintenanceId} · {actionState?.record?.item?.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Are you sure you want to continue?
          </p>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeAction} disabled={submitting}>
              Cancel
            </Button>
            <Button
              variant={actionState?.action === 'delete' ? 'danger' : 'primary'}
              onClick={submitAction}
              loading={submitting}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
}
