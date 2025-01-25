import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input
        className="w-full p-2 border mb-4"
        type="text"
        placeholder="Name"
        name="name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
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
      <button className="w-full bg-blue-500 text-white p-2">Register</button>
    </form>
  );
};

export default Register;
