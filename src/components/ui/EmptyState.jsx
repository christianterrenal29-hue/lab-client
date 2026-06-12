import { AlertCircle, Package, Search } from 'lucide-react';
import { cn } from '../../utils/helpers';

export default function EmptyState({
  icon: Icon = Package,
  title = 'No data found',
  description,
  action,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-4">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}

export function NoSearchResults({ query }) {
  return (
    <EmptyState
      icon={Search}
      title="No results found"
      description={`No results found for "${query}". Try adjusting your search or filters.`}
    />
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <EmptyState
      icon={AlertCircle}
      title="Something went wrong"
      description={message || 'An error occurred while loading data.'}
      action={
        onRetry && (
          <button
            onClick={onRetry}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            Try again
          </button>
        )
      }
    />
  );
}
