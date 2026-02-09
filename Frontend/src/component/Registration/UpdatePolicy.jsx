import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Policies() {
  const [policies, setPolicies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedPolicy, setEditedPolicy] = useState({});

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

  const handleEdit = (policy) => {
    setEditingId(policy.policyId);
    setEditedPolicy({ ...policy });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPolicy((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8081/api/policies/${editingId}`, editedPolicy, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Policy updated successfully!');
      setEditingId(null);
      setEditedPolicy({});
      const response = await axios.get('http://localhost:8081/api/policies', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPolicies(response.data);
    } catch (error) {
      console.error('Error updating policy:', error);
      alert('Failed to update policy.');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedPolicy({});
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Your Policies</h1>

      {loading && <p className="text-gray-500">Loading policies...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.map((policy) => (
          <div key={policy.policyId} className="bg-white shadow-lg rounded-lg p-6 border border-blue-200">
            {editingId === policy.policyId ? (
              <>
                {[
                  { label: 'Policy Number', name: 'policyNumber' },
                  { label: 'Coverage Type', name: 'coverageType' },
                  { label: 'Coverage Amount', name: 'coverageAmount' },
                  { label: 'Premium Amount', name: 'premiumAmount' },
                  { label: 'Vehicle Details', name: 'vehicleDetails' },
                  { label: 'Start Date', name: 'startDate', type: 'date' },
                  { label: 'End Date', name: 'endDate', type: 'date' },
                ].map(({ label, name, type = 'text' }) => (
                  <div key={name} className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={editedPolicy[name]}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                ))}

                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Policy Status</label>
                  <select
                    name="policyStatus"
                    value={editedPolicy.policyStatus}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="RENEWED">RENEWED</option>
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
                <h2 className="text-xl font-semibold text-blue-700 mb-2">Policy #{policy.policyNumber}</h2>
                <p><strong>Type:</strong> {policy.coverageType}</p>
                <p><strong>Coverage:</strong> ₹{policy.coverageAmount}</p>
                <p><strong>Premium:</strong> ₹{policy.premiumAmount}</p>
                <p><strong>Status:</strong> {policy.policyStatus}</p>
                <p><strong>Vehicle:</strong> {policy.vehicleDetails}</p>
                <p><strong>Start:</strong> {policy.startDate}</p>
                <p><strong>End:</strong> {policy.endDate}</p>
                <button
                  onClick={() => handleEdit(policy)}
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

