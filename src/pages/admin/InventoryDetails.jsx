import { QRCodeSVG } from 'qrcode.react';
import Badge from '../../components/ui/Badge';
<<<<<<< HEAD
import Button from '../../components/ui/Button';
=======
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
import { formatDate } from '../../utils/helpers';

export default function InventoryDetails({ item }) {
  if (!item) return null;
<<<<<<< HEAD
  const itemUrl = item.itemUrl || `${window.location.origin}/inventory/${item._id}`;
  const location = [item.room, item.cabinet, item.shelf].filter(Boolean).join(' / ') || item.location || '-';
  const isLowStock = Number(item.quantity || 0) <= Number(item.minimumStock || 0);
=======
>>>>>>> 6f02213f17862507603ace70185a986836e978b9

  return (
    <div className="space-y-6">
      {/* Header with QR Code */}
<<<<<<< HEAD
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="h-36 w-36 overflow-hidden rounded-lg border border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
              No photo
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          <div className="p-2 bg-white rounded-lg border border-gray-300">
            <QRCodeSVG
              value={itemUrl}
=======
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="p-2 bg-white rounded-lg border border-gray-200">
            <QRCodeSVG
              value={JSON.stringify({
                itemId: item.itemId,
                name: item.name,
                serialNumber: item.serialNumber,
              })}
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
              size={120}
            />
          </div>
          <p className="text-xs text-center text-gray-500 mt-2">{item.itemId}</p>
<<<<<<< HEAD
          <Button type="button" size="sm" variant="secondary" className="mt-2 w-full print:hidden" onClick={() => window.print()}>
            Print QR
          </Button>
=======
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {item.name}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {item.brand} {item.model}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={item.status}>{item.status}</Badge>
            <Badge variant={item.condition}>{item.condition}</Badge>
<<<<<<< HEAD
            {isLowStock && <Badge variant="Low Stock">LOW STOCK</Badge>}
=======
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        <DetailItem label="Category" value={item.category} />
        <DetailItem label="Serial Number" value={item.serialNumber || '-'} />
<<<<<<< HEAD
        <DetailItem label="Quantity" value={`${item.quantity ?? 0} / minimum ${item.minimumStock ?? 0}`} />
        <DetailItem label="Laboratory" value={item.laboratory?.name || '-'} />
        <DetailItem label="Room" value={item.room || '-'} />
        <DetailItem label="Cabinet" value={item.cabinet || '-'} />
        <DetailItem label="Shelf" value={item.shelf || '-'} />
        <DetailItem label="Location" value={location} />
        <DetailItem label="Next Maintenance" value={formatDate(item.nextMaintenanceDate) || '-'} />
=======
        <DetailItem label="Laboratory" value={item.laboratory?.name || '-'} />
        <DetailItem label="Location" value={item.location || '-'} />
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
        <DetailItem label="Purchase Date" value={formatDate(item.purchaseDate) || '-'} />
        <DetailItem
          label="Purchase Price"
          value={item.purchasePrice ? `$${item.purchasePrice.toFixed(2)}` : '-'}
        />
        <DetailItem label="Warranty Expiry" value={formatDate(item.warrantyExpiry) || '-'} />
        <DetailItem
          label="Added By"
          value={
            item.addedBy
              ? `${item.addedBy.firstName} ${item.addedBy.lastName}`
              : '-'
          }
        />
      </div>

      {/* Specifications */}
      {item.specifications && Object.values(item.specifications).some(Boolean) && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Specifications
          </h4>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 grid grid-cols-2 gap-3">
            {item.specifications.processor && (
              <DetailItem label="Processor" value={item.specifications.processor} />
            )}
            {item.specifications.ram && (
              <DetailItem label="RAM" value={item.specifications.ram} />
            )}
            {item.specifications.storage && (
              <DetailItem label="Storage" value={item.specifications.storage} />
            )}
            {item.specifications.os && (
              <DetailItem label="OS" value={item.specifications.os} />
            )}
            {item.specifications.other && (
              <DetailItem label="Other" value={item.specifications.other} />
            )}
          </div>
        </div>
      )}

      {/* Notes */}
      {item.notes && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Notes
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            {item.notes}
          </p>
        </div>
      )}

      {/* Timestamps */}
<<<<<<< HEAD
      <div className="text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-300 dark:border-gray-700">
=======
      <div className="text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
        <p>Created: {formatDate(item.createdAt)}</p>
        <p>Last Updated: {formatDate(item.updatedAt)}</p>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}
