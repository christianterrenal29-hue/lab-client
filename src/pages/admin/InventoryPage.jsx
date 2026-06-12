import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, QrCode, Filter } from 'lucide-react';
import api from '../../services/api';
import DataTable from '../../components/tables/DataTable';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import InventoryForm from './InventoryForm';
import InventoryDetails from './InventoryDetails';
import toast from 'react-hot-toast';

const CATEGORIES = [
  'Computer',
  'Monitor',
  'Keyboard',
  'Mouse',
  'Printer',
  'Networking',
  'AVR/UPS',
  'Projector',
  'Other',
];

const STATUSES = ['Available', 'Borrowed', 'Under Maintenance', 'Damaged', 'Missing'];

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: '', status: '' });
  const [showFilters, setShowFilters] = useState(false);

  const [modalState, setModalState] = useState({
    form: false,
    details: false,
    delete: false,
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, [pagination.page, search, filters]);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
      });
      if (search) params.append('search', search);
      if (filters.category) params.append('category', filters.category);
      if (filters.status) params.append('status', filters.status);

      const response = await api.get(`/inventory?${params}`);
      setItems(response.data.items);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      toast.error('Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleOpenForm = (item = null) => {
    setSelectedItem(item);
    setModalState((prev) => ({ ...prev, form: true }));
  };

  const handleOpenDetails = (item) => {
    setSelectedItem(item);
    setModalState((prev) => ({ ...prev, details: true }));
  };

  const handleOpenDelete = (item) => {
    setSelectedItem(item);
    setModalState((prev) => ({ ...prev, delete: true }));
  };

  const handleCloseModal = (type) => {
    setModalState((prev) => ({ ...prev, [type]: false }));
    if (type !== 'delete') {
      setSelectedItem(null);
    }
  };

  const handleFormSuccess = () => {
    handleCloseModal('form');
    fetchInventory();
  };

  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      setDeleting(true);
      await api.delete(`/inventory/${selectedItem._id}`);
      toast.success('Item deleted successfully');
      handleCloseModal('delete');
      setSelectedItem(null);
      fetchInventory();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete item');
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      key: 'itemId',
      header: 'Item ID',
      render: (value) => (
        <span className="font-mono text-sm text-primary-600 dark:text-primary-400">
          {value}
        </span>
      ),
    },
    {
      key: 'name',
      header: 'Name',
      render: (value, row) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {row.brand} {row.model}
          </p>
        </div>
      ),
    },
    { key: 'category', header: 'Category' },
    {
      key: 'status',
      header: 'Status',
      render: (value) => <Badge variant={value}>{value}</Badge>,
    },
    {
      key: 'condition',
      header: 'Condition',
      render: (value) => <Badge variant={value}>{value}</Badge>,
    },
    {
      key: 'laboratory',
      header: 'Laboratory',
      render: (value) => value?.name || '-',
    },
    {
      key: 'actions',
      header: 'Actions',
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleOpenDetails(row)}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleOpenForm(row)}
            className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleOpenDelete(row)}
            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Inventory</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage laboratory equipment and supplies
          </p>
        </div>
        <Button onClick={() => handleOpenForm()}>
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      <Card>
        <Card.Body>
          {/* Filters */}
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            {(filters.category || filters.status) && (
              <button
                onClick={() => setFilters({ category: '', status: '' })}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Clear filters
              </button>
            )}
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
                  className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
                  className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="">All Statuses</option>
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <DataTable
            columns={columns}
            data={items}
            loading={loading}
            pagination={pagination}
            onPageChange={handlePageChange}
            onSearch={handleSearch}
            searchPlaceholder="Search by name, brand, model, or ID..."
            emptyMessage="No inventory items found"
            sortable
          />
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalState.form}
        onClose={() => handleCloseModal('form')}
        title={selectedItem ? 'Edit Item' : 'Add New Item'}
        size="lg"
      >
        <InventoryForm
          item={selectedItem}
          onSuccess={handleFormSuccess}
          onCancel={() => handleCloseModal('form')}
        />
      </Modal>

      {/* Details Modal */}
      <Modal
        isOpen={modalState.details}
        onClose={() => handleCloseModal('details')}
        title="Item Details"
        size="lg"
      >
        <InventoryDetails item={selectedItem} />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={modalState.delete}
        onClose={() => handleCloseModal('delete')}
        onConfirm={handleDelete}
        title="Delete Item"
        message={`Are you sure you want to delete "${selectedItem?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        loading={deleting}
      />
    </div>
  );
}
