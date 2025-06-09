import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Upload, AreaChart, Clock, FileText, Plus, TrendingUp, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ExcelFile, ChartData } from '../types';
import SavedChartsHistory from '../components/charts/SavedChartsHistory';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [recentFiles, setRecentFiles] = useState<ExcelFile[]>([]);
  const [recentCharts, setRecentCharts] = useState<ChartData[]>([]);
  const [showChartsHistory, setShowChartsHistory] = useState(false);

  useEffect(() => {
    // Mock data loading
    // In a real app, these would be API calls
    const mockFiles: ExcelFile[] = [
      {
        id: '1',
        name: 'sales_data_2024.xlsx',
        uploadDate: new Date().toISOString(),
        size: 1024 * 45,
        userId: user?.id || '',
        columns: ['Month', 'Region', 'Sales', 'Profit']
      },
      {
        id: '2',
        name: 'marketing_metrics.xlsx',
        uploadDate: new Date(Date.now() - 86400000).toISOString(),
        size: 1024 * 32,
        userId: user?.id || '',
        columns: ['Campaign', 'Clicks', 'Conversions', 'Cost']
      },
      {
        id: '3',
        name: 'financial_report_q2.xlsx',
        uploadDate: new Date(Date.now() - 86400000 * 3).toISOString(),
        size: 1024 * 78,
        userId: user?.id || '',
        columns: ['Month', 'Revenue', 'Expenses', 'Profit']
      }
    ];

    const mockCharts: ChartData[] = [
      {
        id: '1',
        fileId: '1',
        userId: user?.id || '',
        chartType: 'bar',
        title: 'Monthly Sales by Region',
        xAxis: 'Month',
        yAxis: 'Sales',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        fileId: '2',
        userId: user?.id || '',
        chartType: 'line',
        title: 'Campaign Performance',
        xAxis: 'Campaign',
        yAxis: 'Conversions',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '3',
        fileId: '3',
        userId: user?.id || '',
        chartType: 'pie',
        title: 'Revenue Distribution',
        xAxis: 'Month',
        yAxis: 'Revenue',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
      }
    ];

    setRecentFiles(mockFiles);
    setRecentCharts(mockCharts);
  }, [user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
        <p className="text-gray-600 mt-2">Here's an overview of your Excel analytics with advanced features</p>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Link
          to="/upload"
          className="flex items-center p-6 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all hover:scale-105"
        >
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Upload className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-medium text-gray-900">Upload Excel</h2>
            <p className="text-sm text-gray-500">Import new data</p>
          </div>
        </Link>

        <div className="flex items-center p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-teal-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-medium text-gray-900">{recentCharts.length}</h2>
            <p className="text-sm text-gray-500">Charts created</p>
          </div>
        </div>

        <div className="flex items-center p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
            <FileText className="h-5 w-5 text-purple-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-medium text-gray-900">{recentFiles.length}</h2>
            <p className="text-sm text-gray-500">Files uploaded</p>
          </div>
        </div>

        <button
          onClick={() => setShowChartsHistory(!showChartsHistory)}
          className="flex items-center p-6 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg shadow-md text-white hover:shadow-lg transition-all hover:scale-105"
        >
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-medium">View History</h2>
            <p className="text-sm opacity-90">Saved charts</p>
          </div>
        </button>
      </div>

      {/* New Features Banner */}
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Zap className="h-8 w-8 text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">New Advanced Features Available!</h3>
            <p className="text-gray-600 mt-1">
              ✨ AI-powered chart suggestions • 📊 Multiple export formats (PNG, PDF, JPEG, CSV) • 💾 Save and manage chart history
            </p>
          </div>
        </div>
      </div>

      {/* Saved Charts History */}
      {showChartsHistory && (
        <div className="mb-12">
          <SavedChartsHistory />
        </div>
      )}

      {/* Recent Files Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Files</h2>
          <Link to="/upload" className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium">
            <Plus className="h-4 w-4 mr-1" />
            Upload New
          </Link>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Uploaded
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <div className="text-sm font-medium text-gray-900">{file.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDate(file.uploadDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatFileSize(file.size)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`/analysis/${file.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                        Analyze
                      </Link>
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Charts Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Charts</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentCharts.map((chart) => (
            <div key={chart.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-medium text-gray-900 truncate">{chart.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Created {formatDate(chart.createdAt)}
                </p>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    {chart.chartType === 'bar' && <BarChart3 className="h-4 w-4 text-blue-600" />}
                    {chart.chartType === 'line' && <AreaChart className="h-4 w-4 text-blue-600" />}
                    {chart.chartType === 'pie' && <AreaChart className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div className="text-sm text-gray-500">
                    {chart.chartType === 'bar' && 'Bar Chart'}
                    {chart.chartType === 'line' && 'Line Chart'}
                    {chart.chartType === 'pie' && 'Pie Chart'}
                  </div>
                </div>
                <Link
                  to={`/analysis/${chart.fileId}?chart=${chart.id}`}
                  className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;