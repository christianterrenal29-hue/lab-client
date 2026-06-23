import { cn } from '../../utils/helpers';

export default function StatCard({ title, value, icon: Icon, trend, trendLabel, color = 'primary' }) {
  const colors = {
<<<<<<< HEAD
    primary: 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300',
    green: 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300',
    yellow: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
    red: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    blue: 'bg-teal-50 text-school-teal dark:bg-teal-900/20 dark:text-teal-300',
    purple: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
  };

  return (
    <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)] dark:border-gray-700 dark:bg-gray-800 dark:shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
=======
    primary: 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    yellow: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
    red: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={cn(
                  'text-xs font-medium',
                  trend >= 0 ? 'text-green-600' : 'text-red-600'
                )}
              >
                {trend >= 0 ? '+' : ''}
                {trend}%
              </span>
              {trendLabel && (
                <span className="text-xs text-gray-500 dark:text-gray-400">{trendLabel}</span>
              )}
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn('p-3 rounded-lg', colors[color])}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
}
