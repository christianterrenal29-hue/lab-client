import { useState, useEffect } from 'react';
import api from '../../services/api';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Modal from '../../components/ui/Modal';
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
const CONDITIONS = ['New', 'Good', 'Fair', 'Poor'];

const initialFormData = {
  name: '',
  category: 'Computer',
  brand: '',
  model: '',
  serialNumber: '',
  status: 'Available',
<<<<<<< HEAD
  quantity: 1,
  minimumStock: 1,
  condition: 'Good',
  laboratory: '',
  location: '',
  room: '',
  cabinet: '',
  shelf: '',
  imageUrl: '',
  nextMaintenanceDate: '',
=======
  condition: 'Good',
  laboratory: '',
  location: '',
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
  purchaseDate: '',
  purchasePrice: '',
  warrantyExpiry: '',
  specifications: {
    processor: '',
    ram: '',
    storage: '',
    os: '',
    other: '',
  },
  notes: '',
};

export default function InventoryForm({ item, onSuccess, onCancel }) {
  const [formData, setFormData] = useState(initialFormData);
  const [laboratories, setLaboratories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchLaboratories();
    if (item) {
      setFormData({
        name: item.name || '',
        category: item.category || 'Computer',
        brand: item.brand || '',
        model: item.model || '',
        serialNumber: item.serialNumber || '',
        status: item.status || 'Available',
<<<<<<< HEAD
        quantity: item.quantity ?? 1,
        minimumStock: item.minimumStock ?? 1,
        condition: item.condition || 'Good',
        laboratory: item.laboratory?._id || item.laboratory || '',
        location: item.location || '',
        room: item.room || '',
        cabinet: item.cabinet || '',
        shelf: item.shelf || '',
        imageUrl: item.imageUrl || '',
        nextMaintenanceDate: item.nextMaintenanceDate ? item.nextMaintenanceDate.split('T')[0] : '',
=======
        condition: item.condition || 'Good',
        laboratory: item.laboratory?._id || item.laboratory || '',
        location: item.location || '',
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
        purchaseDate: item.purchaseDate ? item.purchaseDate.split('T')[0] : '',
        purchasePrice: item.purchasePrice || '',
        warrantyExpiry: item.warrantyExpiry ? item.warrantyExpiry.split('T')[0] : '',
        specifications: {
          processor: item.specifications?.processor || '',
          ram: item.specifications?.ram || '',
          storage: item.specifications?.storage || '',
          os: item.specifications?.os || '',
          other: item.specifications?.other || '',
        },
        notes: item.notes || '',
      });
    }
  }, [item]);

  const fetchLaboratories = async () => {
    try {
      const response = await api.get('/laboratories?limit=100');
      setLaboratories(response.data.laboratories || []);
    } catch (error) {
      console.error('Error fetching laboratories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('spec_')) {
      const specKey = name.replace('spec_', '');
      setFormData((prev) => ({
        ...prev,
        specifications: { ...prev.specifications, [specKey]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.category) newErrors.category = 'Category is required';
<<<<<<< HEAD
    if (Number(formData.quantity) < 0) newErrors.quantity = 'Quantity cannot be negative';
    if (Number(formData.minimumStock) < 0) newErrors.minimumStock = 'Minimum stock cannot be negative';
    if (formData.purchasePrice && Number(formData.purchasePrice) < 0) {
      newErrors.purchasePrice = 'Purchase price cannot be negative';
    }
=======
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const payload = {
        ...formData,
<<<<<<< HEAD
        quantity: Number(formData.quantity || 0),
        minimumStock: Number(formData.minimumStock || 0),
=======
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
        purchasePrice: formData.purchasePrice ? Number(formData.purchasePrice) : undefined,
        laboratory: formData.laboratory || undefined,
      };

      if (item) {
        await api.put(`/inventory/${item._id}`, payload);
        toast.success('Item updated successfully');
      } else {
        await api.post('/inventory', payload);
        toast.success('Item added successfully');
      }
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Item Name *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Enter item name"
        />
        <Select
          label="Category *"
          name="category"
          value={formData.category}
          onChange={handleChange}
          error={errors.category}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="e.g., Dell, HP, Lenovo"
        />
        <Input
          label="Model"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="e.g., Inspiron 15"
        />
      </div>

      <Input
        label="Serial Number"
        name="serialNumber"
        value={formData.serialNumber}
        onChange={handleChange}
        placeholder="Enter serial number"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select label="Status" name="status" value={formData.status} onChange={handleChange}>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>
        <Select
          label="Condition"
          name="condition"
          value={formData.condition}
          onChange={handleChange}
        >
          {CONDITIONS.map((cond) => (
            <option key={cond} value={cond}>
              {cond}
            </option>
          ))}
        </Select>
        <Select
          label="Laboratory"
          name="laboratory"
          value={formData.laboratory}
          onChange={handleChange}
        >
          <option value="">Select laboratory</option>
          {laboratories.map((lab) => (
            <option key={lab._id} value={lab._id}>
              {lab.name} ({lab.roomNumber})
            </option>
          ))}
        </Select>
      </div>

<<<<<<< HEAD
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Quantity"
          name="quantity"
          type="number"
          min="0"
          value={formData.quantity}
          onChange={handleChange}
          error={errors.quantity}
        />
        <Input
          label="Minimum Stock"
          name="minimumStock"
          type="number"
          min="0"
          value={formData.minimumStock}
          onChange={handleChange}
          error={errors.minimumStock}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          label="Room"
          name="room"
          value={formData.room}
          onChange={handleChange}
          placeholder="e.g., CL-101"
        />
        <Input
          label="Cabinet"
          name="cabinet"
          value={formData.cabinet}
          onChange={handleChange}
          placeholder="e.g., Cabinet A"
        />
        <Input
          label="Shelf"
          name="shelf"
          value={formData.shelf}
          onChange={handleChange}
          placeholder="e.g., Shelf 2"
        />
        <Input
          label="Location Notes"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Bench, rack, or area"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Photo URL"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/item-photo.jpg"
        />
        <Input
          label="Next Maintenance Date"
          name="nextMaintenanceDate"
          type="date"
          value={formData.nextMaintenanceDate}
          onChange={handleChange}
        />
      </div>
=======
      <Input
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="e.g., Room 101, Rack A"
      />
>>>>>>> 6f02213f17862507603ace70185a986836e978b9

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Purchase Date"
          name="purchaseDate"
          type="date"
          value={formData.purchaseDate}
          onChange={handleChange}
        />
        <Input
          label="Purchase Price"
          name="purchasePrice"
          type="number"
          value={formData.purchasePrice}
          onChange={handleChange}
<<<<<<< HEAD
          error={errors.purchasePrice}
=======
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
          placeholder="0.00"
        />
        <Input
          label="Warranty Expiry"
          name="warrantyExpiry"
          type="date"
          value={formData.warrantyExpiry}
          onChange={handleChange}
        />
      </div>

      {/* Specifications (for computers) */}
      {formData.category === 'Computer' && (
<<<<<<< HEAD
        <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow-sm">
=======
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Specifications
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Processor"
              name="spec_processor"
              value={formData.specifications.processor}
              onChange={handleChange}
              placeholder="e.g., Intel Core i5-12400"
            />
            <Input
              label="RAM"
              name="spec_ram"
              value={formData.specifications.ram}
              onChange={handleChange}
              placeholder="e.g., 16GB DDR4"
            />
            <Input
              label="Storage"
              name="spec_storage"
              value={formData.specifications.storage}
              onChange={handleChange}
              placeholder="e.g., 512GB SSD"
            />
            <Input
              label="Operating System"
              name="spec_os"
              value={formData.specifications.os}
              onChange={handleChange}
              placeholder="e.g., Windows 11 Pro"
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Additional notes..."
        />
      </div>

      <Modal.Footer>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {item ? 'Update Item' : 'Add Item'}
        </Button>
      </Modal.Footer>
    </form>
  );
}
