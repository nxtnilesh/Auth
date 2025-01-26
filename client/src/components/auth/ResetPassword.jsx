import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import FormInput from '../ui/FormInput';
import { toast } from 'react-toastify';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  
  const onSubmit = async ({ password }) => {
    try {
      await api.put(`/auth/reset-password/${token}`, { password });
      toast.success('Password reset successful! Please login');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Password reset failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Reset Password</h2>
          <p className="mt-2 text-gray-600">Enter your new password</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            name="password"
            type="password"
            label="New Password"
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
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            register={register}
            validation={{
              validate: value => 
                value === watch('password') || 'Passwords do not match'
            }}
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}