import React, { useState } from 'react';
import axios from 'axios';

export default function UserPolicy() {
  const [policyId, setPolicyId] = useState('');
  const [policy, setPolicy] = useState(null);
  const [claims, setClaims] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('authToken');

  const fetchPolicyAndClaim = async () => {
    if (!policyId) {
      setError('Please enter a Policy ID.');
      return;
    }

    try {
      // Fetch policy details
      const policyResponse = await axios.get(`http://localhost:8081/api/policies/${policyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPolicy(policyResponse.data);

      // Fetch claim details based on policy ID
      const claimResponse = await axios.get(`http://localhost:8081/api/claim/${policyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClaims(claimResponse.data); // Expecting an array

      setError('');
    } catch (err) {
      console.error('Failed to fetch policy or claim:', err);
      setPolicy(null);
      setClaims([]);
      setError('Policy or claim not found or error occurred.');
    }
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Your Policy & Claim Details</h1>

      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          value={policyId}
          onChange={(e) => setPolicyId(e.target.value)}
          placeholder="Enter Policy ID"
          className="w-full px-4 py-2 border rounded mb-2"
        />
        <button
          onClick={fetchPolicyAndClaim}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Details
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>

      {/* Policy Section */}
      {policy && (
        <div className="bg-white p-6 rounded shadow border max-w-md mx-auto mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Policy Details</h2>
          <p><strong>Policy ID:</strong> {policy.policyId}</p>
          <p><strong>Vehicle Details:</strong> {policy.vehicleDetails}</p>
          <p><strong>Coverage Type:</strong> {policy.coverageType}</p>
          <p><strong>Coverage Amount:</strong> ₹{policy.coverageAmount}</p>
          <p><strong>Premium Amount:</strong> ₹{policy.premiumAmount}</p>
          <p><strong>Start Date:</strong> {policy.startDate}</p>
          <p><strong>End Date:</strong> {policy.endDate}</p>
        </div>
      )}

      {/* Claims Section */}
      {claims.length > 0 && (
        <div className="max-w-md mx-auto space-y-4">
          {claims.map((claim) => (
            <div key={claim.claimId} className="bg-white p-6 rounded shadow border">
              <h2 className="text-xl font-semibold text-green-700 mb-2">Claim Details</h2>
              <p><strong>Claim ID:</strong> {claim.claimId}</p>
              <p><strong>Policy ID:</strong> {claim.policyId}</p>
              <p><strong>Adjuster ID/User ID:</strong> {claim.adjusterId}</p>
              <p><strong>Claim Amount:</strong> ₹{claim.claimAmount}</p>
              <p><strong>Claim Date:</strong> {claim.claimDate}</p>
              <p><strong>Status:</strong> {claim.claimStatus}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
