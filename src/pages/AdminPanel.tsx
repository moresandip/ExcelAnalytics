import React, { useState, useEffect } from 'react';
import { Users, Database, Activity, HardDrive, AlertCircle, CheckCircle2, Search } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [storageUsage, setStorageUsage] = useState({ used: 0, total: 100 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // Mock API call to fetch admin data
    const fetchAdminData = async () => {
      setLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock users data
        const mockUsers = [
          {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'user',
            filesUploaded: 12,
            chartsCreated: 25,
            lastLogin: '2024-06-10T15:30:00Z',
            storageUsed: 15.4,
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'user',
            filesUploaded: 8,
            chartsCreated: 14,
            lastLogin: '2024-06-09T11:45:00Z',
            storageUsed: 7.2,
          },
          {
            id: '3',
            name: 'Alex Johnson',
            email: 'alex.johnson@example.com',
            role: 'user',
            filesUploaded: 5,
            chartsCreated: 10,
            lastLogin: '2024-06-08T09:15:00Z',
            storageUsed: 4.8,
          },
          {
            id: '4',
            name: 'Emily Davis',
            email: 'emily.davis@example.com',
            role: 'user',
            filesUploaded: 15,
            chartsCreated: 32,
            lastLogin: '2024-06-10T16:20:00Z',
            storageUsed: 18.6,
          },
          {
            id: '5',
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            role: 'admin',
            filesUploaded: 3,
            chartsCreated: 7,
            lastLogin: '2024-06-10T14:10:00Z',
            storageUsed: 2.1,
          },
        ];
        
        // Mock storage usage data
        const mockStorageUsage = {
          used: 48.1,
          total: 100
        };
        
        setUsers(mockUsers);
        setStorageUsage(mockStorageUsage);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAdminData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserSelect = (user: any) => {
    setSelectedUser(user);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      // In a real app, this would be an API call
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setSelectedUser(null);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage users, monitor system usage, and track analytics
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-semibold text-gray-900">{users.length}</h2>
              <p className="text-sm text-gray-500">Total Users</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
              <Database className="h-5 w-5 text-teal-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                {users.reduce((acc, user) => acc + user.filesUploaded, 0)}
              </h2>
              <p className="text-sm text-gray-500">Files Uploaded</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Activity className="h-5 w-5 text-purple-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                {users.reduce((acc, user) => acc + user.chartsCreated, 0)}
              </h2>
              <p className="text-sm text-gray-500">Charts Created</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <HardDrive className="h-5 w-5 text-amber-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                {storageUsage.used.toFixed(1)} GB
              </h2>
              <p className="text-sm text-gray-500">
                of {storageUsage.total} GB Used
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-blue-600 rounded-full" 
                style={{ width: `${(storageUsage.used / storageUsage.total) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-right mt-1 text-gray-500">
              {Math.round((storageUsage.used / storageUsage.total) * 100)}% of storage used
            </p>
          </div>
        </div>
      </div>

      {/* User Management Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">User Management</h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Files
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Charts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Storage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.filesUploaded}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.chartsCreated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.storageUsed.toFixed(1)} GB
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(user.lastLogin)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleUserSelect(user)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </button>
                    {user.role !== 'admin' && (
                      <button 
                        onClick={() => {
                          setSelectedUser(user);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="p-6 text-center">
            <p className="text-gray-500">No users found matching your search.</p>
          </div>
        )}
      </div>

      {/* System Notifications */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">System Notifications</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">System update completed</p>
                <p className="text-sm text-gray-500 mt-1">
                  The system has been updated to version 2.1.0 with new features and improvements.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Today at 10:30 AM
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-amber-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Storage usage alert</p>
                <p className="text-sm text-gray-500 mt-1">
                  Storage usage has reached 48% of the total capacity. Consider upgrading your plan.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Yesterday at 2:15 PM
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">New user registration</p>
                <p className="text-sm text-gray-500 mt-1">
                  5 new users have registered in the last 24 hours.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Yesterday at 9:45 AM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete User Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete User
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete the user "{selectedUser?.name}"? All of their data will be permanently removed. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDeleteUser}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;