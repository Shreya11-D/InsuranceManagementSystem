import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
 
export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
 
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, [location]);
 
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/');
  };
 
  return (
    <header className="bg-gradient-to-r from-blue-800 to-teal-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo + Title */}
        <div className="flex items-center space-x-3">
          {/* Drive Shield Logo (SVG) */}
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-800"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zM5 6.3l7-3.11 7 3.11V11c0 4.42-2.94 8.44-7 9.71C7.94 19.44 5 15.42 5 11V6.3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold tracking-wide">
            Drive Shield
          </h1>
        </div>
 
        {/* Navigation */}
        <nav className="space-x-6 text-lg font-medium">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/about" className="hover:text-yellow-300 transition">About</Link>
          {!isLoggedIn ? (
            <Link to="/login" className="hover:text-yellow-300 transition">Login</Link>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:text-yellow-300 transition"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
 