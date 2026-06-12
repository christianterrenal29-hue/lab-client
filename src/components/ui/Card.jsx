import { cn } from '../../utils/helpers';

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className }) {
  return (
    <div
      className={cn(
        'px-6 py-4 border-b border-gray-200 dark:border-gray-700',
        className
      )}
    >
      {children}
    </div>
  );
};

Card.Body = function CardBody({ children, className }) {
  return <div className={cn('p-6', className)}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className }) {
  return (
    <div
      className={cn(
        'px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl',
        className
      )}
    >
      {children}
    </div>
  );
};
