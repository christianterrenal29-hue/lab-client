<<<<<<< HEAD
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import api from '../../services/api';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import EmptyState from '../../components/ui/EmptyState';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Select from '../../components/ui/Select';
import Spinner from '../../components/ui/Spinner';

const emptyForm = {
  name: '',
  building: '',
  roomNumber: '',
  floor: '',
  capacity: '',
  status: 'Active',
  inCharge: '',
  description: '',
};

function personName(user) {
  if (!user) return 'Unassigned';
  return `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || 'Unassigned';
}

function detailValue(value) {
  return value || 'Not specified';
}

export default function LaboratoriesPage() {
  const [laboratories, setLaboratories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [formData, setFormData] = useState(emptyForm);
  const [selectedLab, setSelectedLab] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const staffOptions = useMemo(
    () => users.filter((user) => user.role === 'admin' || user.role === 'staff'),
    [users]
  );

  const fetchLaboratories = async () => {
    const response = await api.get('/laboratories?limit=100');
    setLaboratories(response.data.laboratories || []);
  };

  useEffect(() => {
    const loadPageData = async () => {
      try {
        const [labsResponse, usersResponse] = await Promise.all([
          api.get('/laboratories?limit=100'),
          api.get('/users?limit=100'),
        ]);
        setLaboratories(labsResponse.data.laboratories || []);
        setUsers(usersResponse.data.users || []);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load laboratories');
=======
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
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
      } finally {
        setLoading(false);
      }
    };

<<<<<<< HEAD
    loadPageData();
  }, []);

  const openCreateForm = () => {
    setFormMode('create');
    setSelectedLab(null);
    setFormData(emptyForm);
    setIsFormOpen(true);
  };

  const openEditForm = (lab) => {
    setFormMode('edit');
    setSelectedLab(lab);
    setFormData({
      name: lab.name || '',
      building: lab.building || '',
      roomNumber: lab.roomNumber || '',
      floor: lab.floor || '',
      capacity: lab.capacity ?? '',
      status: lab.status || 'Active',
      inCharge: lab.inCharge?._id || '',
      description: lab.description || '',
    });
    setIsFormOpen(true);
  };

  const openView = (lab) => {
    setSelectedLab(lab);
    setIsViewOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const buildPayload = () => ({
    name: formData.name.trim(),
    building: formData.building.trim(),
    roomNumber: formData.roomNumber.trim(),
    floor: formData.floor.trim(),
    capacity: Number(formData.capacity) || 0,
    status: formData.status,
    description: formData.description.trim(),
    ...(formData.inCharge ? { inCharge: formData.inCharge } : { inCharge: null }),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const payload = buildPayload();
      if (formMode === 'edit' && selectedLab) {
        await api.put(`/laboratories/${selectedLab._id}`, payload);
        toast.success('Laboratory updated');
      } else {
        await api.post('/laboratories', payload);
        toast.success('Laboratory created');
      }

      await fetchLaboratories();
      setIsFormOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save laboratory');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      await api.delete(`/laboratories/${deleteTarget._id}`);
      setLaboratories((current) => current.filter((lab) => lab._id !== deleteTarget._id));
      toast.success('Laboratory deleted');
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete laboratory');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Laboratories</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage laboratory rooms and status.</p>
        </div>
        <Button onClick={openCreateForm} className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          Add Laboratory
        </Button>
      </div>

=======
    fetchLaboratories();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Laboratories</h1>
        <p className="text-gray-500 dark:text-gray-400">View laboratory rooms and status.</p>
      </div>
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
      <Card>
        <Card.Body>
          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <Spinner />
            </div>
<<<<<<< HEAD
          ) : laboratories.length === 0 ? (
            <EmptyState
              title="No Laboratories Found"
              description="Create the first laboratory record to start assigning rooms and equipment."
              action={
                <Button onClick={openCreateForm} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Laboratory
                </Button>
              }
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {laboratories.map((lab) => (
                <article
                  key={lab._id}
                  className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate font-semibold text-gray-900 dark:text-white">
                        {lab.name}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {lab.building || 'Building'} - Room {lab.roomNumber}
=======
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
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
                      </p>
                    </div>
                    <Badge variant={lab.status}>{lab.status}</Badge>
                  </div>
<<<<<<< HEAD

                  <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-gray-500 dark:text-gray-400">Floor</dt>
                      <dd className="font-medium text-gray-900 dark:text-white">
                        {detailValue(lab.floor)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500 dark:text-gray-400">Capacity</dt>
                      <dd className="font-medium text-gray-900 dark:text-white">
                        {lab.capacity || 0}
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-gray-500 dark:text-gray-400">In-Charge</dt>
                      <dd className="font-medium text-gray-900 dark:text-white">
                        {personName(lab.inCharge)}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => openView(lab)} className="gap-2">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => openEditForm(lab)} className="gap-2">
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => setDeleteTarget(lab)} className="gap-2">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </article>
=======
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                    Capacity: {lab.capacity || 0}
                  </p>
                </div>
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
<<<<<<< HEAD

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={formMode === 'edit' ? 'Edit Laboratory' : 'Add Laboratory'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Laboratory Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Building"
              name="building"
              value={formData.building}
              onChange={handleChange}
            />
            <Input
              label="Room Number"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              required
            />
            <Input
              label="Floor"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
            />
            <Input
              label="Capacity"
              name="capacity"
              type="number"
              min="0"
              value={formData.capacity}
              onChange={handleChange}
            />
            <Select label="Status" name="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Under Maintenance">Under Maintenance</option>
            </Select>
          </div>

          <Select label="In-Charge" name="inCharge" value={formData.inCharge} onChange={handleChange}>
            <option value="">Unassigned</option>
            {staffOptions.map((user) => (
              <option key={user._id} value={user._id}>
                {personName(user)} ({user.role})
              </option>
            ))}
          </Select>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm transition-colors duration-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
            />
          </div>

          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={() => setIsFormOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" loading={saving}>
              {formMode === 'edit' ? 'Save Changes' : 'Create Laboratory'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Laboratory Details" size="lg">
        {selectedLab && (
          <div className="space-y-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedLab.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {detailValue(selectedLab.building)} - Room {selectedLab.roomNumber}
                </p>
              </div>
              <Badge variant={selectedLab.status}>{selectedLab.status}</Badge>
            </div>

            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Building</dt>
                <dd className="font-medium text-gray-900 dark:text-white">
                  {detailValue(selectedLab.building)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Room Number</dt>
                <dd className="font-medium text-gray-900 dark:text-white">
                  {detailValue(selectedLab.roomNumber)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Floor</dt>
                <dd className="font-medium text-gray-900 dark:text-white">
                  {detailValue(selectedLab.floor)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Capacity</dt>
                <dd className="font-medium text-gray-900 dark:text-white">
                  {selectedLab.capacity || 0}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm text-gray-500 dark:text-gray-400">In-Charge</dt>
                <dd className="font-medium text-gray-900 dark:text-white">
                  {personName(selectedLab.inCharge)}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm text-gray-500 dark:text-gray-400">Description</dt>
                <dd className="text-gray-700 dark:text-gray-200">
                  {detailValue(selectedLab.description)}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Laboratory"
        message={`Delete ${deleteTarget?.name || 'this laboratory'}? This cannot be undone.`}
        confirmText="Delete"
        loading={deleting}
      />
=======
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
    </div>
  );
}
