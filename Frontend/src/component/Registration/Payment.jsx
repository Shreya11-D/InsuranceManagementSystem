import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Payment() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('authToken'); // Get token from localStorage

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:8081/payment', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched payments:', response.data);
        setPayments(response.data);
      } catch (err) {
        setError('Failed to fetch payments');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [token]);

  return (
    <div className="h-80 overflow-y-auto">
      <div className="p-6 bg-green-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-green-800">Your Payments</h1>

        {loading && <p className="text-gray-500">Loading payments...</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {payments.map((payment) => (
            <div key={payment.paymentId} className="bg-white shadow-lg rounded-lg p-6 border border-green-200">
              <h2 className="text-xl font-semibold text-green-700 mb-2">Payment #{payment.paymentId}</h2>
              <p><strong>Date:</strong> {payment.paymentDate}</p>
              <p><strong>Amount:</strong> ₹{payment.paymentAmount}</p>
              <p><strong>Status:</strong> {payment.paymentStatus}</p>
              <p><strong>Policy ID:</strong> {payment.policyId}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
