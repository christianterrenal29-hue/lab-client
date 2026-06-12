import { useEffect, useMemo, useState } from 'react';
import api from '../../services/api';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';

function SummaryGrid({ title, data }) {
  const entries = Object.entries(data || {});

  return (
    <Card>
      <Card.Header>
        <h2 className="font-semibold text-gray-900 dark:text-white">{title}</h2>
      </Card.Header>
      <Card.Body>
        {entries.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No data available.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {entries.map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-800"
              >
                <Badge variant={label}>{label}</Badge>
                <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
              </div>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

function escapeCsv(value) {
  const text = String(value ?? '');
  return `"${text.replace(/"/g, '""')}"`;
}

export default function ReportsPage() {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ startDate: '', endDate: '' });

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (filters.startDate) params.set('startDate', filters.startDate);
    if (filters.endDate) params.set('endDate', filters.endDate);
    return params.toString();
  }, [filters]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const suffix = queryString ? `?${queryString}` : '';
        const [inventory, borrow, maintenance] = await Promise.all([
          api.get(`/inventory/stats${suffix}`),
          api.get(`/borrow/stats${suffix}`),
          api.get(`/maintenance/stats${suffix}`),
        ]);
        setReports({
          inventory: inventory.data,
          borrow: borrow.data,
          maintenance: maintenance.data,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [queryString]);

  const reportRows = useMemo(() => {
    const rows = [
      ['Section', 'Metric', 'Value'],
      ['Inventory', 'Total', reports?.inventory?.total || 0],
      ['Borrowing', 'Total', reports?.borrow?.total || 0],
      ['Maintenance', 'Total', reports?.maintenance?.total || 0],
      ['Maintenance', 'Total Cost', reports?.maintenance?.totalCost || 0],
    ];

    const appendGroup = (section, groupName, data) => {
      Object.entries(data || {}).forEach(([label, value]) => {
        rows.push([section, `${groupName}: ${label}`, value]);
      });
    };

    appendGroup('Inventory', 'Status', reports?.inventory?.byStatus);
    appendGroup('Inventory', 'Category', reports?.inventory?.byCategory);
    appendGroup('Inventory', 'Condition', reports?.inventory?.byCondition);
    appendGroup('Borrowing', 'Status', reports?.borrow?.byStatus);
    appendGroup('Maintenance', 'Status', reports?.maintenance?.byStatus);
    appendGroup('Maintenance', 'Type', reports?.maintenance?.byType);
    appendGroup('Maintenance', 'Priority', reports?.maintenance?.byPriority);

    return rows;
  }, [reports]);

  const handleCsvExport = () => {
    const csv = reportRows.map((row) => row.map(escapeCsv).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'laboratory-inventory-report.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading && !reports) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Printable summaries with safe CSV export.
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-3 print:hidden">
          <Input
            label="Start Date"
            type="date"
            value={filters.startDate}
            onChange={(event) => setFilters((prev) => ({ ...prev, startDate: event.target.value }))}
          />
          <Input
            label="End Date"
            type="date"
            value={filters.endDate}
            onChange={(event) => setFilters((prev) => ({ ...prev, endDate: event.target.value }))}
          />
          <Button variant="secondary" onClick={() => window.print()}>
            Print
          </Button>
          <Button onClick={handleCsvExport}>Export CSV</Button>
        </div>
      </div>

      <div className="hidden print:block">
        <p>
          Date range: {filters.startDate || 'All'} to {filters.endDate || 'All'}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <Card.Body>
            <p className="text-sm text-gray-500 dark:text-gray-400">Inventory Items</p>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {reports?.inventory?.total || 0}
            </p>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <p className="text-sm text-gray-500 dark:text-gray-400">Borrow Records</p>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {reports?.borrow?.total || 0}
            </p>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <p className="text-sm text-gray-500 dark:text-gray-400">Maintenance Records</p>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {reports?.maintenance?.total || 0}
            </p>
          </Card.Body>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SummaryGrid title="Inventory by Status" data={reports?.inventory?.byStatus} />
        <SummaryGrid title="Inventory by Category" data={reports?.inventory?.byCategory} />
        <SummaryGrid title="Inventory by Condition" data={reports?.inventory?.byCondition} />
        <SummaryGrid title="Borrow by Status" data={reports?.borrow?.byStatus} />
        <SummaryGrid title="Maintenance by Status" data={reports?.maintenance?.byStatus} />
        <SummaryGrid title="Maintenance by Type" data={reports?.maintenance?.byType} />
        <SummaryGrid title="Maintenance by Priority" data={reports?.maintenance?.byPriority} />
      </div>
    </div>
  );
}
