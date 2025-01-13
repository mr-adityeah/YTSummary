import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignOut, useAuthenticationStatus } from '@nhost/react';
import { Home, History, LogOut } from 'lucide-react';

export function Navbar() {
  const { isAuthenticated } = useAuthenticationStatus();
  const { signOut } = useSignOut();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            {isAuthenticated && (
              <Link
                to="/summaries"
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <History size={20} />
                <span>My Summaries</span>
              </Link>
            )}
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}