import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Upload, AreaChart, Clock, FileText, Plus, TrendingUp, Zap, Database, Download, Eye, Calendar, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ExcelFile, ChartData } from '../types';
import SavedChartsHistory from '../components/charts/SavedChartsHistory';
import FadeInUp from '../components/animations/FadeInUp';
import AnimatedCounter from '../components/animations/AnimatedCounter';
import GlowingButton from '../components/animations/GlowingButton';
import PulsingOrb from '../components/animations/PulsingOrb';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [recentFiles, setRecentFiles] = useState<ExcelFile[]>([]);
  const [recentCharts, setRecentCharts] = useState<ChartData[]>([]);
  const [showChartsHistory, setShowChartsHistory] = useState(false);
  const [stats, setStats] = useState({
    totalFiles: 0,
    totalCharts: 0,
    totalDownloads: 0,
    storageUsed: 0
  });

  useEffect(() => {
    // Mock data loading with enhanced statistics
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
      },
      {
        id: '4',
        name: 'customer_analytics.xlsx',
        uploadDate: new Date(Date.now() - 86400000 * 5).toISOString(),
        size: 1024 * 56,
        userId: user?.id || '',
        columns: ['Customer_ID', 'Age', 'Purchase_Amount', 'Category']
      },
      {
        id: '5',
        name: 'inventory_tracking.xlsx',
        uploadDate: new Date(Date.now() - 86400000 * 7).toISOString(),
        size: 1024 * 89,
        userId: user?.id || '',
        columns: ['Product', 'Stock', 'Price', 'Supplier']
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
        title: 'Campaign Performance Trends',
        xAxis: 'Campaign',
        yAxis: 'Conversions',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '3',
        fileId: '3',
        userId: user?.id || '',
        chartType: 'pie',
        title: 'Revenue Distribution Q2',
        xAxis: 'Month',
        yAxis: 'Revenue',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      {
        id: '4',
        fileId: '4',
        userId: user?.id || '',
        chartType: 'scatter',
        title: 'Customer Age vs Purchase Amount',
        xAxis: 'Age',
        yAxis: 'Purchase_Amount',
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
      },
      {
        id: '5',
        fileId: '5',
        userId: user?.id || '',
        chartType: 'area',
        title: 'Inventory Value Over Time',
        xAxis: 'Product',
        yAxis: 'Price',
        createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
      }
    ];

    setRecentFiles(mockFiles);
    setRecentCharts(mockCharts);
    setStats({
      totalFiles: mockFiles.length,
      totalCharts: mockCharts.length,
      totalDownloads: 47,
      storageUsed: 2.3
    });
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-pink-400/5 to-orange-400/5 rounded-full animate-float-medium"></div>
      </div>

      <div className="relative">
        <FadeInUp>
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <PulsingOrb size="md" color="blue" intensity="medium" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}! 
              <span className="inline-block animate-bounce-gentle ml-2">👋</span>
            </h1>
            <p className="text-gray-600 text-lg">Here's your comprehensive Excel analytics dashboard with beautiful animations</p>
          </div>
        </FadeInUp>

        {/* Enhanced Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <FadeInUp delay={200}>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white hover-lift hover-glow group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Files</p>
                  <p className="text-3xl font-bold">
                    <AnimatedCounter end={stats.totalFiles} />
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-400 rounded-lg flex items-center justify-center group-hover:animate-bounce-gentle">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-blue-100 text-sm">
                <TrendingUp className="h-4 w-4 mr-1 animate-pulse" />
                <span>+2 this week</span>
              </div>
            </div>
          </FadeInUp>

          <FadeInUp delay={400}>
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl shadow-xl p-6 text-white hover-lift hover-glow group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm font-medium">Charts Created</p>
                  <p className="text-3xl font-bold">
                    <AnimatedCounter end={stats.totalCharts} />
                  </p>
                </div>
                <div className="h-12 w-12 bg-teal-400 rounded-lg flex items-center justify-center group-hover:animate-scale-pulse">
                  <BarChart3 className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-teal-100 text-sm">
                <TrendingUp className="h-4 w-4 mr-1 animate-pulse" />
                <span>+5 this week</span>
              </div>
            </div>
          </FadeInUp>

          <FadeInUp delay={600}>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white hover-lift hover-glow group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Downloads</p>
                  <p className="text-3xl font-bold">
                    <AnimatedCounter end={stats.totalDownloads} />
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-400 rounded-lg flex items-center justify-center group-hover:animate-pulse-medium">
                  <Download className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-purple-100 text-sm">
                <TrendingUp className="h-4 w-4 mr-1 animate-pulse" />
                <span>+12 this month</span>
              </div>
            </div>
          </FadeInUp>

          <FadeInUp delay={800}>
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl shadow-xl p-6 text-white hover-lift hover-glow group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-medium">Storage Used</p>
                  <p className="text-3xl font-bold">
                    <AnimatedCounter end={stats.storageUsed} suffix=" GB" />
                  </p>
                </div>
                <div className="h-12 w-12 bg-amber-400 rounded-lg flex items-center justify-center group-hover:animate-rotate-slow">
                  <Database className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-amber-100 text-sm">
                <span>of 10 GB available</span>
              </div>
            </div>
          </FadeInUp>
        </div>

        {/* Enhanced Quick Actions */}
        <FadeInUp delay={1000}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Link
              to="/upload"
              className="group flex items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover-lift hover-glow transition-all duration-500"
            >
              <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center transition-colors group-hover:animate-bounce-gentle">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">📊 Excel Import</h2>
                <p className="text-sm text-gray-500">Upload & analyze</p>
              </div>
            </Link>

            <button
              onClick={() => setShowChartsHistory(!showChartsHistory)}
              className="group flex items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover-lift hover-glow transition-all duration-500"
            >
              <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-teal-100 group-hover:bg-teal-200 flex items-center justify-center transition-colors group-hover:animate-scale-pulse">
                <TrendingUp className="h-6 w-6 text-teal-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">📈 Chart History</h2>
                <p className="text-sm text-gray-500">View saved charts</p>
              </div>
            </button>

            <div className="group flex items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover-lift">
              <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center group-hover:animate-glow">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">🤖 AI Insights</h2>
                <p className="text-sm text-gray-500">Smart analysis</p>
              </div>
            </div>

            <div className="group flex items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover-lift">
              <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center group-hover:animate-pulse-medium">
                <Download className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">💾 Export Options</h2>
                <p className="text-sm text-gray-500">Multiple formats</p>
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* New Features Banner */}
        <FadeInUp delay={1200}>
          <div className="mb-8 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border border-blue-200 rounded-2xl p-6 glass">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Sparkles className="h-10 w-10 text-blue-600 animate-pulse" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  🚀 All Features Active & Working with Beautiful Animations!
                </h3>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2 animate-pulse">✅</span>
                    Excel Import (.xls/.xlsx)
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2 animate-pulse">✅</span>
                    Interactive Charts (15+ types)
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2 animate-pulse">✅</span>
                    Export (PNG/PDF/JPEG/CSV)
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2 animate-pulse">✅</span>
                    Beautiful Animations
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2 animate-pulse">✅</span>
                    3D Visualizations
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2 animate-pulse">✅</span>
                    AI-Powered Insights
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* Saved Charts History */}
        {showChartsHistory && (
          <FadeInUp delay={1400}>
            <div className="mb-12">
              <SavedChartsHistory />
            </div>
          </FadeInUp>
        )}

        {/* Recent Files Section */}
        <FadeInUp delay={1600}>
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">📁 Recent Files</h2>
              <GlowingButton 
                variant="primary" 
                size="sm"
                icon={Plus}
                onClick={() => window.location.href = '/upload'}
              >
                Upload New File
              </GlowingButton>
            </div>
            
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 hover-lift">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        File Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Upload Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Columns
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentFiles.map((file, index) => (
                      <tr key={file.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400 mr-3 group-hover:animate-bounce-gentle" />
                            <div className="text-sm font-medium text-gray-900">{file.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(file.uploadDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatFileSize(file.size)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {file.columns.length} columns
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <Link 
                            to={`/analysis/${file.id}`} 
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-lg text-blue-600 bg-blue-100 hover:bg-blue-200 transition-all hover:scale-105"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Analyze
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* Recent Charts Section */}
        <FadeInUp delay={1800}>
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">📊 Recent Charts</h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full animate-pulse">
                {recentCharts.length} charts created
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentCharts.map((chart, index) => (
                <FadeInUp key={chart.id} delay={2000 + index * 200}>
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover-lift hover-glow group">
                    <div className="p-6 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{chart.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Created {formatDate(chart.createdAt)}
                      </p>
                    </div>
                    <div className="p-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3 group-hover:animate-bounce-gentle">
                          {chart.chartType === 'bar' && <BarChart3 className="h-5 w-5 text-blue-600" />}
                          {chart.chartType === 'line' && <AreaChart className="h-5 w-5 text-blue-600" />}
                          {chart.chartType === 'pie' && <AreaChart className="h-5 w-5 text-blue-600" />}
                          {chart.chartType === 'scatter' && <AreaChart className="h-5 w-5 text-blue-600" />}
                          {chart.chartType === 'area' && <AreaChart className="h-5 w-5 text-blue-600" />}
                        </div>
                        <div className="text-sm text-gray-600">
                          <p className="font-medium capitalize">{chart.chartType} Chart</p>
                          <p className="text-xs text-gray-400">{chart.xAxis} vs {chart.yAxis}</p>
                        </div>
                      </div>
                      <Link
                        to={`/analysis/${chart.fileId}?chart=${chart.id}`}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-lg text-blue-600 bg-blue-100 hover:bg-blue-200 transition-all hover:scale-105"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </div>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
};

export default Dashboard;