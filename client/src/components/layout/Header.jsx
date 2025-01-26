import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              MERN Auth
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-600">{user.email}</span>
                <button
                  onClick={logout}
                  className="text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-800">
                  Login
                </Link>
                <Link to="/register" className="text-gray-600 hover:text-gray-800">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}