import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Claim() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('authToken'); // Get token from localStorage

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/claim', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched claims:', response.data);
        setClaims(response.data);
      } catch (err) {
        setError('Failed to fetch claims');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, [token]);

  return (
    <div className="h-80 overflow-y-auto">
      <div className="p-6 bg-blue-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Your Claims</h1>

        {loading && <p className="text-gray-500">Loading claims...</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {claims.map((claim) => (
            <div key={claim.claimId} className="bg-white shadow-lg rounded-lg p-6 border border-blue-200">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">Claim #{claim.claimId}</h2>
              <p><strong>Date:</strong> {claim.claimDate}</p>
              <p><strong>Amount:</strong> ₹{claim.claimAmount}</p>
              <p><strong>Status:</strong> {claim.claimStatus}</p>
              <p><strong>Policy ID:</strong> {claim.policyId}</p>
              <p><strong>Adjuster ID:</strong> {claim.adjusterId}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
