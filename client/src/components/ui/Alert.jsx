import { ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function Alert({ type, message }) {
  const alertConfig = {
    success: {
      bg: 'bg-green-50',
      text: 'text-green-800',
      icon: CheckCircleIcon,
    },
    error: {
      bg: 'bg-red-50',
      text: 'text-red-800',
      icon: ExclamationTriangleIcon,
    },
  };

  const { bg, text, icon: Icon } = alertConfig[type] || alertConfig.error;

  return (
    <div className={`rounded-md p-4 ${bg}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${text}`} aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${text}`}>{message}</p>
        </div>
      </div>
    </div>
  );
}