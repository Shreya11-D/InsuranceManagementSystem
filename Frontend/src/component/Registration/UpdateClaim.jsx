import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UpdateClaim() {
  const [claims, setClaims] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedClaim, setEditedClaim] = useState({});

  const token = localStorage.getItem('authToken'); // Get token from localStorage

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/claim', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

  const handleEdit = (claim) => {
    setEditingId(claim.claimId);
    setEditedClaim({ ...claim });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedClaim((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:8081/api/claim/status', editedClaim, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Claim updated successfully!');
      setEditingId(null);
      setEditedClaim({});
      const response = await axios.get('http://localhost:8081/api/claim', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClaims(response.data);
    } catch (error) {
      console.error('Error updating claim:', error);
      alert('Failed to update claim.');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedClaim({});
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Your Claims</h1>

      {loading && <p className="text-gray-500">Loading claims...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {claims.map((claim) => (
          <div key={claim.claimId} className="bg-white shadow-lg rounded-lg p-6 border border-blue-200">
            {editingId === claim.claimId ? (
              <>
                {[
                  { label: 'Claim Amount', name: 'claimAmount' },
                  { label: 'Claim Date', name: 'claimDate' },
                  { label: 'Policy ID', name: 'policyId' },
                  { label: 'Adjuster ID', name: 'adjusterId' },
                ].map(({ label, name, type = 'text' }) => (
                  <div key={name} className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={editedClaim[name]}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                ))}

                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Claim Status</label>
                  <select
                    name="claimStatus"
                    value={editedClaim.claimStatus}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="ACTIVE">OPEN</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </div>

                <div className="flex gap-2 mt-4">
                  <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    Save
                  </button>
                  <button onClick={handleCancel} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-blue-700 mb-2">Claim #{claim.claimId}</h2>
                <p><strong>Amount:</strong> ₹{claim.claimAmount}</p>
                <p><strong>Date:</strong> {claim.claimDate}</p>
                <p><strong>Status:</strong> {claim.claimStatus}</p>
                <p><strong>Policy ID:</strong> {claim.policyId}</p>
                <p><strong>Adjuster ID:</strong> {claim.adjusterId}</p>
                <button
                  onClick={() => handleEdit(claim)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
