import React from 'react';
import Dashboard from './Dashboard';

export default function RoleBasedDashboard() {
  const role = localStorage.getItem('userRole'); // 'admin', 'agent', or 'user'

  return <Dashboard role={role} />;
}
