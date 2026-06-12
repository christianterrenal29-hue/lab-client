import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { cn } from '../../utils/helpers';

const variants = {
  info: {
    container: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
    icon: 'text-blue-500',
    title: 'text-blue-800 dark:text-blue-300',
    text: 'text-blue-700 dark:text-blue-400',
    Icon: Info,
  },
  success: {
    container: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
    icon: 'text-green-500',
    title: 'text-green-800 dark:text-green-300',
    text: 'text-green-700 dark:text-green-400',
    Icon: CheckCircle,
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
    icon: 'text-yellow-500',
    title: 'text-yellow-800 dark:text-yellow-300',
    text: 'text-yellow-700 dark:text-yellow-400',
    Icon: AlertCircle,
  },
  error: {
    container: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
    icon: 'text-red-500',
    title: 'text-red-800 dark:text-red-300',
    text: 'text-red-700 dark:text-red-400',
    Icon: XCircle,
  },
};

export default function Alert({ variant = 'info', title, children, className }) {
  const styles = variants[variant];
  const Icon = styles.Icon;

  return (
    <div
      className={cn(
        'flex gap-3 p-4 rounded-lg border',
        styles.container,
        className
      )}
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', styles.icon)} />
      <div>
        {title && (
          <h4 className={cn('font-medium mb-1', styles.title)}>{title}</h4>
        )}
        <div className={cn('text-sm', styles.text)}>{children}</div>
      </div>
    </div>
  );
}
