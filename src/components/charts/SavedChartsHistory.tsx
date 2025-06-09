import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { chartService, SavedChart } from '../../services/chartService';
import { BarChart3, LineChart, PieChart, ScatterChart as Scatter, AreaChart, Trash2, Eye, Calendar, FileText } from 'lucide-react';

const SavedChartsHistory: React.FC = () => {
  const [savedCharts, setSavedCharts] = useState<SavedChart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchSavedCharts();
  }, []);

  const fetchSavedCharts = async () => {
    try {
      setLoading(true);
      const charts = await chartService.getUserCharts();
      setSavedCharts(charts);
    } catch (err) {
      setError('Failed to load saved charts');
      console.error('Error fetching saved charts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteChart = async (chartId: string) => {
    try {
      await chartService.deleteChart(chartId);
      setSavedCharts(prev => prev.filter(chart => chart.id !== chartId));
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting chart:', err);
    }
  };

  const getChartIcon = (chartType: string) => {
    switch (chartType) {
      case 'bar':
      case 'column3d':
      case 'bar3d':
        return <BarChart3 className="h-5 w-5" />;
      case 'line':
      case 'area':
        return <LineChart className="h-5 w-5" />;
      case 'pie':
        return <PieChart className="h-5 w-5" />;
      case 'scatter':
        return <Scatter className="h-5 w-5" />;
      default:
        return <AreaChart className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button 
            onClick={fetchSavedCharts}
            className="mt-2 text-blue-600 hover:text-blue-800"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Saved Charts History</h3>
        <p className="text-sm text-gray-500 mt-1">
          {savedCharts.length} saved chart{savedCharts.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      {savedCharts.length === 0 ? (
        <div className="p-8 text-center">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No Saved Charts</h4>
          <p className="text-gray-500 mb-4">
            Start creating and saving charts to see them here.
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Upload Excel File
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {savedCharts.map((chart) => (
            <div key={chart.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    {getChartIcon(chart.chartType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {chart.title}
                    </h4>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(chart.createdAt)}
                      </span>
                      <span className="capitalize">
                        {chart.chartType} chart
                      </span>
                      <span>
                        {chart.labels.length} data points
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      X: {chart.xAxis} • Y: {chart.yAxis}
                      {chart.zAxis && ` • Z: ${chart.zAxis}`}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/analysis/${chart.fileId}?chart=${chart.id}`}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Link>
                  
                  <button
                    onClick={() => setDeleteConfirm(chart.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-600 bg-red-100 hover:bg-red-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Chart</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this chart? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteChart(deleteConfirm)}
                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedChartsHistory;