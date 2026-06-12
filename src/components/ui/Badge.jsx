import { cn, getStatusColor } from '../../utils/helpers';

export default function Badge({ children, variant, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variant ? getStatusColor(variant) : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        className
      )}
    >
      {children}
    </span>
  );
}
