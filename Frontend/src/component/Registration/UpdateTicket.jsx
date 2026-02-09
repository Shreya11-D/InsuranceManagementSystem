import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UpdateTicket() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedTicket, setEditedTicket] = useState({
    issueDescription: '',
    createdDate: '',
    resolvedDate: '',
    ticketStatus: 'OPEN',
  });

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/ticket', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTickets(response.data);
      } catch (err) {
        setError('Failed to fetch tickets');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [token]);

  const handleEdit = (ticket) => {
    setEditingId(ticket.ticketId);
    setEditedTicket({
      issueDescription: ticket.issueDescription || '',
      createdDate: ticket.createdDate || '',
      resolvedDate: ticket.resolvedDate || '',
      ticketStatus: ticket.ticketStatus || 'OPEN',
      ticketId: ticket.ticketId,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditedTicket((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === 'ticketStatus' && value === 'RESOLVED') {
        updated.resolvedDate = new Date().toISOString().split('T')[0];
      }

      return updated;
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8081/api/ticket/resolve/${editedTicket.ticketId}`, editedTicket, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Ticket updated successfully!');
      setEditingId(null);
      setEditedTicket({});
      const response = await axios.get('http://localhost:8081/api/ticket', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTickets(response.data);
    } catch (error) {
      console.error('Error updating ticket:', error);
      alert('Failed to update ticket.');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedTicket({});
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Support Tickets</h1>

      {loading && <p className="text-gray-500">Loading tickets...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div key={ticket.ticketId} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            {editingId === ticket.ticketId ? (
              <>
                {[
                  { label: 'Issue Description', name: 'issueDescription' },
                  { label: 'Created Date', name: 'createdDate' },
                  { label: 'Resolved Date', name: 'resolvedDate' },
                ].map(({ label, name }) => (
                  <div key={name} className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input
                      type="text"
                      name={name}
                      value={editedTicket[name]}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                ))}

                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Status</label>
                  <select
                    name="ticketStatus"
                    value={editedTicket.ticketStatus}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="RESOLVED">RESOLVED</option>
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
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Ticket #{ticket.ticketId}</h2>
                <p><strong>UserId:</strong> {ticket.userId}</p>
                <p><strong>Issue:</strong> {ticket.issueDescription}</p>
                <p><strong>Status:</strong> {ticket.ticketStatus}</p>
                <p><strong>Created:</strong> {ticket.createdDate}</p>
                <p><strong>Resolved:</strong> {ticket.resolvedDate || 'N/A'}</p>
                <button
                  onClick={() => handleEdit(ticket)}
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