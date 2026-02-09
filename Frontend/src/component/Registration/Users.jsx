import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/auth', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">User List</h1>

      {loading && <p className="text-gray-500">Loading users...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {users.map((user) => (
          <div
            key={user.userId}
            className="bg-white shadow-lg rounded-lg p-6 border border-blue-200 w-full h-full min-h-[250px] break-words whitespace-normal"
          >
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              Username: {user.userName}
            </h2>
            <p><strong>User ID:</strong> {user.userId}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Location:</strong> {user.location}</p>
            <p><strong>Role:</strong> {user.role}</p>
            {/* <p><strong>Password:</strong> {user.password}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}