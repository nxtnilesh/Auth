import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import FormInput from '../ui/FormInput';
import { LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormInput
              icon={<EnvelopeIcon className="h-5 w-5" />}
              type="email"
              placeholder="Email address"
              {...register('email', { required: 'Email is required' })}
              error={errors.email}
            />
            
            <FormInput
              icon={<LockClosedIcon className="h-5 w-5" />}
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
              error={errors.password}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}