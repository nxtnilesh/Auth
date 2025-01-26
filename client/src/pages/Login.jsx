import { useState } from "react";
import { loginUser } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(formData);
      login(data.data, data.accessToken);
      navigate("/profile");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        className="w-full p-2 border mb-4"
        type="email"
        placeholder="Email"
        name="email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        className="w-full p-2 border mb-4"
        type="password"
        placeholder="Password"
        name="password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button className="w-full bg-blue-500 text-white p-2">Login</button>
    </form>
  );
};

export default Login;
