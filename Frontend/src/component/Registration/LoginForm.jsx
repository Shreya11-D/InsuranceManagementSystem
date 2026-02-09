import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:8081/api/auth';

function LoginForm() {
  const [loginData, setLoginData] = useState({
    userName: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();

    // Manual validation
    if (!loginData.userName || !loginData.password) {
      setMessage('Both username and password are required.');
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/login`, loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { message, role, userName, token } = res.data;

      if (token) localStorage.setItem('authToken', token);
      if (role) localStorage.setItem('userRole', role);
      if (userName) localStorage.setItem('username', userName);

      // alert(`${role} successfully logged in`);
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Invalid login');
    }
  };

  return (
    <div className="h-137 flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Login</h2>
        <form className="space-y-4" onSubmit={login}>
          <input
            name="userName"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Username"
            value={loginData.userName}
            onChange={handleLoginChange}
            required
          />
          <input
            name="password"
            type="password"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}

        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
