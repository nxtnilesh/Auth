import { createContext, useContext, useState, useEffect } from "react";
import { refreshAccessToken } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData, accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  const fetchAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const { data } = await refreshAccessToken(refreshToken);
      localStorage.setItem("accessToken", data.accessToken);
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setUser({}); // Mock, replace with user fetch if needed
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
