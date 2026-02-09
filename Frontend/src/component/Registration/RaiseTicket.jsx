import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RaiseTicket() {
  const [formData, setFormData] = useState({
    userId: '',
    issueDescription: '',
    ticketStatus: 'OPEN',
    resolvedDate: '',
  });

  const [createdDate, setCreatedDate] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setCreatedDate(today);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ticketData = {
      userId: parseInt(formData.userId),
      issueDescription: formData.issueDescription,
      ticketStatus: formData.ticketStatus,
      createdDate: createdDate,
      resolvedDate: formData.resolvedDate || null,
    };

    try {
      const response = await axios.post('http://localhost:8081/api/ticket', ticketData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        setStatusMessage('Ticket created successfully!');
        const today = new Date().toISOString().split('T')[0];
        setFormData({
          userId: '',
          issueDescription: '',
          ticketStatus: 'OPEN',
          resolvedDate: '',
        });
        setCreatedDate(today);
      } else {
        setStatusMessage(`Failed to create ticket: ${response.statusText}`);
      }
    } catch (error) {
      setStatusMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Raise a Support Ticket</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow border max-w-md mx-auto">
        <input
          type="number"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          placeholder="User ID"
          className="w-full px-3 py-2 border rounded mb-4"
          required
        />
        <textarea
          name="issueDescription"
          value={formData.issueDescription}
          onChange={handleChange}
          placeholder="Describe your issue..."
          className="w-full px-3 py-2 border rounded mb-4"
          required
        />
        <label htmlFor="ticketStatus" className="block text-sm font-medium text-gray-700 mb-1">
          Ticket Status
        </label>
        <select
          name="ticketStatus"
          id="ticketStatus"
          value={formData.ticketStatus}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded mb-4"
        >
          <option value="OPEN">OPEN</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>

        <label htmlFor="resolvedDate" className="block text-sm font-medium text-gray-700 mb-1">
          Resolved Date
        </label>
        <input
          type="date"
          name="resolvedDate"
          id="resolvedDate"
          value={formData.resolvedDate}
          readOnly
          className="w-full px-3 py-2 border rounded mb-4 bg-gray-100 text-gray-600"
        />

        <label htmlFor="createdDate" className="block text-sm font-medium text-gray-700 mb-1">
          Created Date
        </label>
        <input
          type="date"
          name="createdDate"
          id="createdDate"
          value={createdDate}
          readOnly
          className="w-full px-3 py-2 border rounded mb-4 bg-gray-100 text-gray-600"
        />


        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Ticket
        </button>
      </form>

      {statusMessage && (
        <p className="mt-4 text-sm text-center text-gray-700">{statusMessage}</p>
      )}
    </div>
  );
}
