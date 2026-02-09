import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:8081/api/auth';

function RegisterForm() {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    email: '',
    role: '',
    location: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegisterChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@gmail\.com$/;
    return regex.test(email);
  };

  const register = async (e) => {
    e.preventDefault();

    // Manual validation for all fields
    if (
      !formData.userName ||
      !formData.password ||
      !formData.email ||
      !formData.role ||
      !formData.location
    ) {
      setMessage('All fields are required.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setMessage('Please enter a valid Gmail address ending with @gmail.com.');
      return;
    }

    try {
      const formattedData = {
        ...formData,
        role: formData.role.toUpperCase(),
        location: formData.location.toUpperCase(),
      };

      const res = await axios.post(`${API_BASE}/register`, formattedData);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      setMessage(err.response?.data || 'Registration failed');
    }
  };

  return (
    <div className="h-137 flex items-center justify-center bg-gradient-to-r from-green-100 to-green-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-700">Register</h2>
        <form className="space-y-4" onSubmit={register}>
          <input
            name="userName"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Username"
            value={formData.userName}
            onChange={handleRegisterChange}
            required
          />
          <input
            name="password"
            type="password"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Password"
            value={formData.password}
            onChange={handleRegisterChange}
            required
          />
          <input
            name="email"
            type="email"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Email"
            value={formData.email}
            onChange={handleRegisterChange}
            required
          />
          <select
            name="role"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            value={formData.role}
            onChange={handleRegisterChange}
            required
          >
            <option value="">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="AGENT">Agent</option>
            <option value="CUSTOMER">Customer</option>
          </select>

          <select
            name="location"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            value={formData.location}
            onChange={handleRegisterChange}
            required
          >
            <option value="">Select Location</option>
            <option value="MANYATA">MANYATA</option>
            <option value="WHITEFIELD">WHITEFIELD</option>
            <option value="BAGMANE">BAGMANE</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
}

export default RegisterForm;
