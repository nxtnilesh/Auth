import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import FormInput from '../ui/FormInput';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async ({ email }) => {
    try {
      setIsLoading(true);
      await api.post('/auth/forgot-password', { email });
      setMessage('Password reset email sent successfully');
      toast.success('Check your email for reset instructions');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Forgot Password</h2>
          <p className="mt-2 text-gray-600">
            Enter your email to reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            name="email"
            type="email"
            label="Email Address"
            register={register}
            validation={{ required: 'Email is required' }}
            error={errors.email}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Send Reset Email'}
          </button>

          <div className="text-center mt-4">
            <Link to="/login" className="text-indigo-600 hover:text-indigo-800">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}