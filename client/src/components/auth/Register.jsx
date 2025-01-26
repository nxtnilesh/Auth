import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import FormInput from '../ui/FormInput';
import { EnvelopeIcon, UserCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

export default function Register() {
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await authRegister(data);
      toast.success('Registration successful! Please login');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in here
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormInput
              label="Full Name"
              name="name"
              icon={<UserCircleIcon className="h-5 w-5" />}
              register={register}
              validation={{ required: 'Name is required' }}
              error={errors.name}
            />

            <FormInput
              label="Email Address"
              name="email"
              type="email"
              icon={<EnvelopeIcon className="h-5 w-5" />}
              register={register}
              validation={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              }}
              error={errors.email}
            />

            <FormInput
              label="Password"
              name="password"
              type="password"
              icon={<LockClosedIcon className="h-5 w-5" />}
              register={register}
              validation={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              }}
              error={errors.password}
            />

            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              icon={<LockClosedIcon className="h-5 w-5" />}
              register={register}
              validation={{
                required: 'Confirm Password is required',
                validate: value =>
                  value === watch('password') || 'Passwords do not match'
              }}
              error={errors.confirmPassword}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Create Account
          </button>

          <div className="text-center text-sm text-gray-600">
            <p>By creating an account, you agree to our{' '}
              <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">
                Terms of Service
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}