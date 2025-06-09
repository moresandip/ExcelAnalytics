import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, Upload, User, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ExcelAnalytics</span>
            </Link>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex space-x-4 mr-4">
                  <Link to="/dashboard\" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                    <LayoutDashboard className="h-5 w-5 mr-1" />
                    <span>Dashboard</span>
                  </Link>
                  <Link to="/upload" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                    <Upload className="h-5 w-5 mr-1" />
                    <span>Upload</span>
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                      <Shield className="h-5 w-5 mr-1" />
                      <span>Admin</span>
                    </Link>
                  )}
                </div>
                <div className="flex items-center border-l pl-4">
                  <div className="mr-3">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <User className="h-4 w-4 mr-1" />
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;