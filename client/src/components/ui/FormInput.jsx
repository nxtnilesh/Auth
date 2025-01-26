import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function FormInput({
  icon,
  type = 'text',
  placeholder,
  error,
  ...props
}) {
  return (
    <div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          className={`w-full pl-10 pr-3 py-2 border rounded-md ${
            error ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          placeholder={placeholder}
          {...props}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
}