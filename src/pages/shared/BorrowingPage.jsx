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

const CONDITIONS = ['New', 'Good', 'Fair', 'Poor'];

export default function BorrowingPage({ mode = 'manage' }) {
  const [records, setRecords] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [actionState, setActionState] = useState(null);
  const [actionForm, setActionForm] = useState({
    reason: '',
    conditionOnReturn: 'Good',
    notes: '',
  });
  const [formData, setFormData] = useState({
    item: '',
    purpose: '',
    expectedReturnDate: '',
  });

  const canManage = mode === 'manage';
  const canRequest = mode === 'request';

  const fetchRecords = async () => {
    const response = await api.get('/borrow?limit=100');
    setRecords(response.data.records || []);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const requests = [fetchRecords()];
        if (canRequest) {
          requests.push(
            api.get('/inventory?status=Available&limit=100').then((res) => {
              setItems(res.data.items || []);
            })
          );
        }
        await Promise.all(requests);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [canRequest]);

  const handleRequest = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      await api.post('/borrow', formData);
      toast.success('Borrow request submitted');
      setFormData({ item: '', purpose: '', expectedReturnDate: '' });
      await fetchRecords();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit request');
    } finally {
      setSubmitting(false);
    }
  };

  const openAction = (record, action) => {
    setActionState({ record, action });
    setActionForm({ reason: '', conditionOnReturn: 'Good', notes: '' });
  };

  const closeAction = () => {
    setActionState(null);
    setSubmitting(false);
  };

  const submitAction = async () => {
    if (!actionState) return;

    const { record, action } = actionState;
    const payload =
      action === 'reject'
        ? { reason: actionForm.reason }
        : action === 'return'
        ? {
            conditionOnReturn: actionForm.conditionOnReturn,
            notes: actionForm.notes,
          }
        : {};

    if (action === 'reject' && !payload.reason.trim()) {
      toast.error('Rejection reason is required');
      return;
    }

    try {
      setSubmitting(true);
      await api.post(`/borrow/${record._id}/${action}`, payload);
      const labels = { approve: 'approved', reject: 'rejected', return: 'returned' };
      toast.success(`Request ${labels[action]}`);
      closeAction();
      await fetchRecords();
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to ${action} request`);
    } finally {
      setSubmitting(false);
    }
  };

  const actionTitle = {
    approve: 'Approve Borrow Request',
    reject: 'Reject Borrow Request',
    return: 'Return Borrowed Item',
  }[actionState?.action];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {canRequest ? 'Borrow Equipment' : mode === 'history' ? 'Borrow History' : 'Borrowing'}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {canRequest ? 'Request available laboratory equipment.' : 'Track borrowing requests and returns.'}
        </p>
      </div>

      {canRequest && (
        <Card>
          <Card.Header>
            <h2 className="font-semibold text-gray-900 dark:text-white">New Borrow Request</h2>
          </Card.Header>
          <Card.Body>
            <form onSubmit={handleRequest} className="grid gap-4 md:grid-cols-3">
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
              <Input
                label="Purpose"
                value={formData.purpose}
                onChange={(event) => setFormData((prev) => ({ ...prev, purpose: event.target.value }))}
                required
              />
              <Input
                label="Expected Return"
                type="date"
                value={formData.expectedReturnDate}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, expectedReturnDate: event.target.value }))
                }
                required
              />
              <div className="md:col-span-3">
                <Button type="submit" loading={submitting}>
                  Submit Request
                </Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      )}

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
                    <th className="px-3 py-2">Borrow ID</th>
                    <th className="px-3 py-2">Borrower</th>
                    <th className="px-3 py-2">Item</th>
                    <th className="px-3 py-2">Expected Return</th>
                    <th className="px-3 py-2">Status</th>
                    {canManage && <th className="px-3 py-2">Actions</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {records.map((record) => (
                    <tr key={record._id}>
                      <td className="px-3 py-3 font-mono text-xs">{record.borrowId}</td>
                      <td className="px-3 py-3">
                        {record.borrower?.firstName} {record.borrower?.lastName}
                      </td>
                      <td className="px-3 py-3">{record.item?.name || '-'}</td>
                      <td className="px-3 py-3">{formatDate(record.expectedReturnDate)}</td>
                      <td className="px-3 py-3">
                        <Badge variant={record.status}>{record.status}</Badge>
                      </td>
                      {canManage && (
                        <td className="px-3 py-3">
                          <div className="flex flex-wrap gap-2">
                            {record.status === 'Pending' && (
                              <>
                                <Button size="sm" onClick={() => openAction(record, 'approve')}>
                                  Approve
                                </Button>
                                <Button size="sm" variant="danger" onClick={() => openAction(record, 'reject')}>
                                  Reject
                                </Button>
                              </>
                            )}
                            {['Borrowed', 'Overdue'].includes(record.status) && (
                              <Button size="sm" variant="secondary" onClick={() => openAction(record, 'return')}>
                                Return
                              </Button>
                            )}
                          </div>
                        </td>
                      )}
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
            {actionState?.record?.borrowId} · {actionState?.record?.item?.name}
          </p>

          {actionState?.action === 'reject' && (
            <Input
              label="Reason"
              value={actionForm.reason}
              onChange={(event) => setActionForm((prev) => ({ ...prev, reason: event.target.value }))}
              required
            />
          )}

          {actionState?.action === 'return' && (
            <>
              <Select
                label="Condition on Return"
                value={actionForm.conditionOnReturn}
                onChange={(event) =>
                  setActionForm((prev) => ({ ...prev, conditionOnReturn: event.target.value }))
                }
              >
                {CONDITIONS.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </Select>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Notes
                </label>
                <textarea
                  value={actionForm.notes}
                  onChange={(event) => setActionForm((prev) => ({ ...prev, notes: event.target.value }))}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
            </>
          )}

          <Modal.Footer>
            <Button variant="secondary" onClick={closeAction} disabled={submitting}>
              Cancel
            </Button>
            <Button
              variant={actionState?.action === 'reject' ? 'danger' : 'primary'}
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
