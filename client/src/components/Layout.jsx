import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between">
          <Link to="/" className="text-xl font-bold">
            MERN Auth
          </Link>
          <div>
            {user ? (
              <>
                <Link to="/profile" className="mr-4">
                  Profile
                </Link>
                <button onClick={logout} className="text-red-500">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mr-4">
                  Login
                </Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
};

export default Layout;
