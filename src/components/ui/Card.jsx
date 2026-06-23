import { cn } from '../../utils/helpers';

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.25)] border border-gray-300 dark:border-gray-700 transition-shadow duration-200',
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
        'px-6 py-4 border-b border-gray-300 dark:border-gray-700',
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
        'px-6 py-4 border-t border-gray-300 dark:border-gray-700 bg-primary-50 dark:bg-gray-800/70 rounded-b-xl',
        className
      )}
    >
      {children}
    </div>
  );
};
