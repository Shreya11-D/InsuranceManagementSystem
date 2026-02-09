import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreateClaim() {
  const [newClaim, setNewClaim] = useState({
    policyId: '',
    adjusterId: '',
    claimAmount: '',
    claimDate: '',
    claimStatus: 'OPEN',
  });

  const token = localStorage.getItem('authToken');

  // Set current date on component mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setNewClaim((prev) => ({ ...prev, claimDate: today }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClaim((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8081/api/claim', newClaim, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Claim created successfully!');
      const today = new Date().toISOString().split('T')[0];
      setNewClaim({
        policyId: '',
        adjusterId: '',
        claimAmount: '',
        claimDate: today,
        claimStatus: 'OPEN',
      });
    } catch (err) {
      console.error('Error creating claim:', err);
      alert('Failed to create claim.');
    }
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Create a New Claim</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow border max-w-md mx-auto">
        <input
          type="text"
          name="policyId"
          value={newClaim.policyId}
          onChange={handleChange}
          placeholder="Policy ID"
          className="w-full px-3 py-2 border rounded mb-4"
          required
        />
        <textarea
          name="adjusterId"
          value={newClaim.adjusterId}
          onChange={handleChange}
          placeholder="Adjuster ID/User ID"
          className="w-full px-3 py-2 border rounded mb-4"
          required
        />
        <input
          type="number"
          name="claimAmount"
          value={newClaim.claimAmount}
          onChange={handleChange}
          placeholder="Claim Amount"
          className="w-full px-3 py-2 border rounded mb-4"
          required
        />

        <label htmlFor="claimDate" className="block text-sm font-medium text-gray-700 mb-1">
          Claim Date
        </label>
        <input
          type="date"
          name="claimDate"
          id="claimDate"
          value={newClaim.claimDate}
          readOnly
          className="w-full px-3 py-2 border rounded mb-4 bg-gray-100 text-gray-600"
        />

        <label htmlFor="claimStatus" className="block text-sm font-medium text-gray-700 mb-1">
          Claim Status
        </label>
        <input
          type="text"
          name="claimStatus"
          id="claimStatus"
          value={newClaim.claimStatus}
          readOnly
          className="w-full px-3 py-2 border rounded mb-4 bg-gray-100 text-gray-600"
        />


        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Claim
        </button>
      </form>
    </div>
  );
}