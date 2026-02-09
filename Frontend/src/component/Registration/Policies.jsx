import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Policies() {
  const [policies, setPolicies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('authToken'); // Get token from localStorage

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/policies', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPolicies(response.data);
      } catch (err) {
        setError('Failed to fetch policies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [token]);

  return (
    <div className="h-80 overflow-y-auto">
      <div className="p-6 bg-blue-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Your Policies</h1>

        {loading && <p className="text-gray-500">Loading policies...</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((policy) => (
            <div key={policy.policyId} className="bg-white shadow-lg rounded-lg p-6 border border-blue-200">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">Policy #{policy.policyNumber}</h2>
              <p><strong>Type:</strong> {policy.coverageType}</p>
              <p><strong>Coverage:</strong> ₹{policy.coverageAmount}</p>
              <p><strong>Premium:</strong> ₹{policy.premiumAmount}</p>
              <p><strong>Status:</strong> {policy.policyStatus}</p>
              <p><strong>Vehicle:</strong> {policy.vehicleDetails}</p>
              <p><strong>Start:</strong> {policy.startDate}</p>
              <p><strong>End:</strong> {policy.endDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
