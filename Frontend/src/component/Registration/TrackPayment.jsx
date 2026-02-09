import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TrackPayment() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingPayment, setEditingPayment] = useState(null);
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem('authToken');

  const BASE_URL = 'http://localhost:8081/payment';

  const fetchPayments = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPayments(response.data);
    } catch (err) {
      setError('Failed to fetch payments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [token]);

  const handleEditClick = (payment) => {
    setEditingPayment(payment);
    setFormData({
      paymentId: payment.paymentId,
      policyId: payment.policyId,
      paymentAmount: payment.paymentAmount,
      paymentDate: payment.paymentDate,
      paymentStatus: payment.paymentStatus,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${BASE_URL}/${formData.paymentId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Payment updated successfully!');
      setEditingPayment(null);
      setFormData({});
      fetchPayments();
    } catch (error) {
      console.error('Error updating payment:', error);
      alert('Failed to update payment.');
    }
  };

  const handleCancel = () => {
    setEditingPayment(null);
    setFormData({});
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Your Payments</h1>

      {loading && <p className="text-gray-500">Loading payments...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {payments.map((payment) => (
          <div key={payment.paymentId} className="bg-white shadow-lg rounded-lg p-6 border border-blue-200">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Payment #{payment.paymentId}</h2>
            <p><strong>Policy ID:</strong> {payment.policyId}</p>
            <p><strong>Amount:</strong> ₹{payment.paymentAmount}</p>
            <p><strong>Payment Date:</strong> {payment.paymentDate}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span
                className={`font-bold ${
                  payment.paymentStatus?.toUpperCase() === 'FAILED'
                    ? 'text-red-500'
                    : payment.paymentStatus?.toUpperCase() === 'PENDING'
                    ? 'text-yellow-500'
                    : 'text-green-600'
                }`}
              >
                {payment.paymentStatus}
              </span>
            </p>
            {(payment.paymentStatus?.toUpperCase() === 'FAILED' ||
              payment.paymentStatus?.toUpperCase() === 'PENDING') && (
              <button
                onClick={() => handleEditClick(payment)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Retry Payment
              </button>
            )}
          </div>
        ))}
      </div>

      {editingPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Update Payment #{editingPayment.paymentId}</h2>

            {[
              { label: 'Policy ID', name: 'policyId' },
              { label: 'Amount', name: 'paymentAmount', type: 'number' },
              { label: 'Payment Date', name: 'paymentDate', type: 'date' },
            ].map(({ label, name, type = 'text' }) => (
              <div key={name} className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            ))}

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
              <select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="PENDING">PENDING</option>
                <option value="SUCCESS">SUCCESS</option>
                <option value="FAILED">FAILED</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Submit
              </button>
              <button onClick={handleCancel} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
