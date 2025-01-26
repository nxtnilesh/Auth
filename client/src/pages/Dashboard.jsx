import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/layout/Header';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {user?.name}
          </h1>
          <div className="mt-4 bg-white rounded-lg shadow p-6">
            {/* Dashboard content */}
          </div>
        </div>
      </main>
    </div>
  );
}