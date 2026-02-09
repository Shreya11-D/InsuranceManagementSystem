import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreatePolicy() {
  const currentYear = new Date().getFullYear();
  const fixedPrefix = `POL${currentYear}00`;

  const [formData, setFormData] = useState({
    policyNumber: fixedPrefix,
    vehicleDetails: '',
    coverageAmount: '',
    coverageType: '',
    premiumAmount: '',
    startDate: '',
    endDate: '',
    policyStatus: 'ACTIVE',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const today = new Date();
    const startDate = today.toISOString().split('T')[0];

    const endDateObj = new Date(today);
    endDateObj.setFullYear(endDateObj.getFullYear() + 1);
    const endDate = endDateObj.toISOString().split('T')[0];

    setFormData((prev) => ({
      ...prev,
      startDate,
      endDate,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'policyNumber') {
      if (value.startsWith(fixedPrefix)) {
        setFormData({ ...formData, policyNumber: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    if (formData.policyNumber === fixedPrefix) {
      setMessage('Please enter a complete policy number by appending to the default value.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8081/api/policies',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Policy created successfully!');
      console.log(response.data);
    } catch (error) {
      setMessage('Failed to create policy.');
      if (error.response) {
        console.error("Error Response:", error.response.data);
        console.error("Status Code:", error.response.status);
      } else {
        console.error("Error Message:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Create Policy</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Policy Number
          </label>
          <input
            type="text"
            name="policyNumber"
            id="policyNumber"
            value={formData.policyNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />

          <input
            type="text"
            name="vehicleDetails"
            placeholder="Vehicle Details"
            value={formData.vehicleDetails}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            name="coverageAmount"
            placeholder="Coverage Amount"
            value={formData.coverageAmount}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            name="premiumAmount"
            placeholder="Premium Amount"
            value={formData.premiumAmount}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
          <select
            name="coverageType"
            value={formData.coverageType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
            required
          >
            <option value="">Select Coverage Type</option>
            <option value="Comprehensive">Comprehensive</option>
            <option value="Third-Party">Third-Party</option>
            <option value="Collision">Collision</option>
          </select>
          <label className="block">
            <span className="text-gray-700">Start Date</span>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded mt-1"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">End Date</span>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded mt-1"
              required
            />
          </label>
          <label htmlFor="policyStatus" className="block text-sm font-medium text-gray-700 mb-1">
            Policy Status
          </label>
          <select
            name="policyStatus"
            id="policyStatus"
            value={formData.policyStatus}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
            required
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="RENEWED">RENEWED</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Create Policy
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
}

export default CreatePolicy;