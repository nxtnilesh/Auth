import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import FormInput from '../components/ui/FormInput';
import api from '../api/axios';
import { toast } from 'react-toastify';

export default function Profile() {
  const { user, setUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email
    }
  });

  const updateProfile = async (data) => {
    try {
      const { data: updatedUser } = await api.put('/auth/me', data);
      setUser(updatedUser.data);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow px-4 py-6 sm:px-6">
          <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
          
          <form onSubmit={handleSubmit(updateProfile)} className="space-y-6 max-w-lg">
            <FormInput
              label="Name"
              name="name"
              type="text"
              register={register}
              validation={{ required: 'Name is required' }}
              error={errors.name}
            />
            
            <FormInput
              label="Email"
              name="email"
              type="email"
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

            <div className="mt-6">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}