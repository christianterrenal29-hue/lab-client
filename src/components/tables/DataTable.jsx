import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { cn } from '../../utils/helpers';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Spinner from '../ui/Spinner';
import EmptyState from '../ui/EmptyState';

export default function DataTable({
  columns,
  data,
  loading,
  pagination,
  onPageChange,
  onSearch,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No data available',
  sortable = false,
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [localSearch, setLocalSearch] = useState('');

  const sortedData = useMemo(() => {
    if (!sortable || !sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig, sortable]);

  const handleSort = (key) => {
    if (!sortable) return;
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const SortIcon = ({ columnKey }) => {
    if (!sortable) return null;
    if (sortConfig.key !== columnKey) {
      return <ChevronDown className="w-4 h-4 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-primary-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-primary-600" />
    );
  };

  return (
    <div className="w-full">
      {/* Search */}
      {onSearch && (
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={localSearch}
              onChange={handleSearch}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
                    sortable && column.sortable !== false && 'cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700'
                  )}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                  style={{ width: column.width }}
                >
                  <div className="flex items-center gap-1">
                    {column.header}
                    {column.sortable !== false && <SortIcon columnKey={column.key} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12">
                  <div className="flex items-center justify-center">
                    <Spinner />
                  </div>
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12">
                  <EmptyState title={emptyMessage} />
                </td>
              </tr>
            ) : (
              sortedData.map((row, rowIndex) => (
                <tr
                  key={row._id || row.id || rowIndex}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100"
                    >
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
            {pagination.total} results
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
