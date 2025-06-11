import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ChartCreator } from '../components/charts';
import EnhancedChartRenderer from '../components/charts/EnhancedChartRenderer';
import { ChartOptions } from '../types';
import { Save, Download, Trash2, AlertCircle, BarChart3, History, Zap, TrendingUp, FileText, Eye } from 'lucide-react';
import SavedChartsHistory from '../components/charts/SavedChartsHistory';

const FileAnalysis: React.FC = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [fileName, setFileName] = useState('');
  const [columns, setColumns] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [charts, setCharts] = useState<ChartOptions[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [analysisStats, setAnalysisStats] = useState({
    totalRows: 0,
    totalColumns: 0,
    chartsCreated: 0,
    lastModified: ''
  });

  useEffect(() => {
    const fetchFileData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Mock API call to fetch file data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Enhanced mock file data with more comprehensive datasets
        if (fileId === '1') {
          setFileName('sales_data_2024.xlsx');
          setColumns(['Month', 'Region', 'Sales', 'Profit', 'Units_Sold', 'Customer_Count']);
          const mockData = [
            { Month: 'January', Region: 'North', Sales: 12500, Profit: 3750, Units_Sold: 125, Customer_Count: 89 },
            { Month: 'February', Region: 'North', Sales: 13200, Profit: 3960, Units_Sold: 132, Customer_Count: 94 },
            { Month: 'March', Region: 'North', Sales: 15800, Profit: 4740, Units_Sold: 158, Customer_Count: 112 },
            { Month: 'April', Region: 'North', Sales: 14200, Profit: 4260, Units_Sold: 142, Customer_Count: 101 },
            { Month: 'May', Region: 'North', Sales: 16800, Profit: 5040, Units_Sold: 168, Customer_Count: 119 },
            { Month: 'January', Region: 'South', Sales: 9800, Profit: 2940, Units_Sold: 98, Customer_Count: 67 },
            { Month: 'February', Region: 'South', Sales: 10300, Profit: 3090, Units_Sold: 103, Customer_Count: 71 },
            { Month: 'March', Region: 'South', Sales: 11500, Profit: 3450, Units_Sold: 115, Customer_Count: 78 },
            { Month: 'April', Region: 'South', Sales: 12100, Profit: 3630, Units_Sold: 121, Customer_Count: 82 },
            { Month: 'May', Region: 'South', Sales: 13400, Profit: 4020, Units_Sold: 134, Customer_Count: 91 },
            { Month: 'January', Region: 'East', Sales: 14200, Profit: 4260, Units_Sold: 142, Customer_Count: 98 },
            { Month: 'February', Region: 'East', Sales: 15100, Profit: 4530, Units_Sold: 151, Customer_Count: 104 },
            { Month: 'March', Region: 'East', Sales: 16800, Profit: 5040, Units_Sold: 168, Customer_Count: 115 },
            { Month: 'April', Region: 'East', Sales: 17500, Profit: 5250, Units_Sold: 175, Customer_Count: 121 },
            { Month: 'May', Region: 'East', Sales: 18900, Profit: 5670, Units_Sold: 189, Customer_Count: 130 },
            { Month: 'January', Region: 'West', Sales: 10900, Profit: 3270, Units_Sold: 109, Customer_Count: 76 },
            { Month: 'February', Region: 'West', Sales: 11700, Profit: 3510, Units_Sold: 117, Customer_Count: 81 },
            { Month: 'March', Region: 'West', Sales: 13400, Profit: 4020, Units_Sold: 134, Customer_Count: 92 },
            { Month: 'April', Region: 'West', Sales: 14800, Profit: 4440, Units_Sold: 148, Customer_Count: 102 },
            { Month: 'May', Region: 'West', Sales: 15600, Profit: 4680, Units_Sold: 156, Customer_Count: 107 },
          ];
          setData(mockData);
          setAnalysisStats({
            totalRows: mockData.length,
            totalColumns: 6,
            chartsCreated: 0,
            lastModified: new Date().toISOString()
          });
        } else if (fileId === '2') {
          setFileName('marketing_metrics.xlsx');
          setColumns(['Campaign', 'Clicks', 'Conversions', 'Cost', 'CTR', 'CPC']);
          const mockData = [
            { Campaign: 'Facebook Ads', Clicks: 12500, Conversions: 375, Cost: 3750, CTR: 2.8, CPC: 0.30 },
            { Campaign: 'Google Ads', Clicks: 18200, Conversions: 546, Cost: 5460, CTR: 3.2, CPC: 0.30 },
            { Campaign: 'LinkedIn', Clicks: 5800, Conversions: 116, Cost: 2320, CTR: 1.9, CPC: 0.40 },
            { Campaign: 'Twitter', Clicks: 7800, Conversions: 156, Cost: 1560, CTR: 2.1, CPC: 0.20 },
            { Campaign: 'Instagram', Clicks: 10300, Conversions: 309, Cost: 3090, CTR: 3.5, CPC: 0.30 },
            { Campaign: 'TikTok', Clicks: 15500, Conversions: 465, Cost: 4650, CTR: 4.1, CPC: 0.30 },
            { Campaign: 'YouTube', Clicks: 9200, Conversions: 184, Cost: 2760, CTR: 2.4, CPC: 0.30 },
            { Campaign: 'Pinterest', Clicks: 4100, Conversions: 82, Cost: 1230, CTR: 1.8, CPC: 0.30 },
          ];
          setData(mockData);
          setAnalysisStats({
            totalRows: mockData.length,
            totalColumns: 6,
            chartsCreated: 0,
            lastModified: new Date(Date.now() - 86400000).toISOString()
          });
        } else if (fileId === '3') {
          setFileName('financial_report_q2.xlsx');
          setColumns(['Month', 'Revenue', 'Expenses', 'Profit', 'Growth_Rate', 'Margin']);
          const mockData = [
            { Month: 'April', Revenue: 125000, Expenses: 87500, Profit: 37500, Growth_Rate: 5.2, Margin: 30.0 },
            { Month: 'May', Revenue: 132000, Expenses: 92400, Profit: 39600, Growth_Rate: 5.6, Margin: 30.0 },
            { Month: 'June', Revenue: 158000, Expenses: 110600, Profit: 47400, Growth_Rate: 19.7, Margin: 30.0 },
          ];
          setData(mockData);
          setAnalysisStats({
            totalRows: mockData.length,
            totalColumns: 6,
            chartsCreated: 0,
            lastModified: new Date(Date.now() - 86400000 * 3).toISOString()
          });
        } else {
          // Enhanced generic mock data
          setFileName(`excel_file_${fileId}.xlsx`);
          setColumns(['Category', 'Value1', 'Value2', 'Value3', 'Percentage', 'Status']);
          const mockData = [
            { Category: 'Product A', Value1: 100, Value2: 200, Value3: 300, Percentage: 25.5, Status: 'Active' },
            { Category: 'Product B', Value1: 150, Value2: 250, Value3: 350, Percentage: 30.2, Status: 'Active' },
            { Category: 'Product C', Value1: 200, Value2: 300, Value3: 400, Percentage: 35.8, Status: 'Pending' },
            { Category: 'Product D', Value1: 250, Value2: 350, Value3: 450, Percentage: 40.1, Status: 'Active' },
            { Category: 'Product E', Value1: 300, Value2: 400, Value3: 500, Percentage: 45.7, Status: 'Inactive' },
          ];
          setData(mockData);
          setAnalysisStats({
            totalRows: mockData.length,
            totalColumns: 6,
            chartsCreated: 0,
            lastModified: new Date(Date.now() - 86400000 * 5).toISOString()
          });
        }
        
        // Check if we should load a specific chart from URL params
        const chartId = searchParams.get('chart');
        if (chartId) {
          // Load a sample chart configuration
          setCharts([{
            title: 'Sample Saved Chart',
            chartType: 'bar',
            xAxis: columns[0],
            yAxis: columns[1],
          }]);
          setAnalysisStats(prev => ({ ...prev, chartsCreated: 1 }));
        }
      } catch (err) {
        setError('Failed to load file data. Please try again later.');
        console.error('Error fetching file data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFileData();
  }, [fileId, searchParams]);

  const handleCreateChart = (options: ChartOptions) => {
    setCharts(prevCharts => [...prevCharts, options]);
    setAnalysisStats(prev => ({ 
      ...prev, 
      chartsCreated: prev.chartsCreated + 1,
      lastModified: new Date().toISOString()
    }));
  };

  const handleDeleteChart = (index: number) => {
    setCharts(prevCharts => prevCharts.filter((_, i) => i !== index));
    setAnalysisStats(prev => ({ 
      ...prev, 
      chartsCreated: Math.max(0, prev.chartsCreated - 1),
      lastModified: new Date().toISOString()
    }));
  };

  const handleSaveSuccess = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSaveAnalysis = async () => {
    try {
      // Mock saving analysis to the server
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to save analysis. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your Excel data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <FileText className="h-8 w-8 mr-3 text-blue-600" />
              📊 Analyzing: {fileName}
            </h1>
            <p className="text-gray-600 mt-2">
              Create interactive charts, get AI insights, and export in multiple formats
            </p>
            
            {/* Enhanced Stats Bar */}
            <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-1 text-blue-500" />
                <span>{analysisStats.totalRows} rows</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                <span>{analysisStats.totalColumns} columns</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1 text-purple-500" />
                <span>{analysisStats.chartsCreated} charts created</span>
              </div>
              <div className="flex items-center">
                <Save className="h-4 w-4 mr-1 text-amber-500" />
                <span>Modified {formatDate(analysisStats.lastModified)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 ml-6">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              <History className="h-4 w-4 mr-2" />
              {showHistory ? 'Hide' : 'Show'} History
            </button>
            <button
              onClick={handleSaveAnalysis}
              className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Feature Banner */}
      <div className="mb-8 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">🚀 All Advanced Features Active</h3>
              <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Interactive Charts
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  AI Insights
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Multi-Format Export
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Data History
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">8+ Chart Types Available</p>
            <p className="text-xs text-gray-500">PNG • PDF • JPEG • CSV</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {saveSuccess && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
          <div className="flex items-start">
            <BarChart3 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <p className="text-sm text-green-700">Chart saved successfully with AI insights!</p>
          </div>
        </div>
      )}

      {showHistory && (
        <div className="mb-8">
          <SavedChartsHistory />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <ChartCreator columns={columns} onCreateChart={handleCreateChart} />
          
          {/* Enhanced Data Preview */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">📋 Data Preview</h3>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {data.length} rows
              </span>
            </div>
            
            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map((column, index) => (
                      <th 
                        key={index}
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.slice(0, 5).map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                      {columns.map((column, colIndex) => (
                        <td key={colIndex} className="px-4 py-3 whitespace-nowrap text-xs text-gray-600">
                          {typeof row[column] === 'number' 
                            ? row[column].toLocaleString() 
                            : row[column]?.toString() || '-'
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {data.length > 5 && (
                <div className="px-4 py-3 bg-gray-50 text-xs text-gray-500 border-t">
                  Showing 5 of {data.length} rows • {columns.length} columns
                </div>
              )}
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{data.length}</span> rows × <span className="font-medium">{columns.length}</span> columns
              </div>
              <button className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                <Download className="h-4 w-4 mr-1" />
                Export Data
              </button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          {charts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 flex flex-col items-center justify-center text-center border border-gray-100">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-full mb-6">
                <BarChart3 className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Ready to Create Charts</h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Use the chart creator on the left to visualize your data. Select your axes and chart type to get started with AI-powered insights.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                <div className="flex items-center justify-center p-3 bg-blue-50 rounded-lg">
                  <Zap className="h-4 w-4 mr-2 text-blue-600" />
                  AI-powered insights
                </div>
                <div className="flex items-center justify-center p-3 bg-purple-50 rounded-lg">
                  <Download className="h-4 w-4 mr-2 text-purple-600" />
                  Multiple export formats
                </div>
                <div className="flex items-center justify-center p-3 bg-green-50 rounded-lg">
                  <Save className="h-4 w-4 mr-2 text-green-600" />
                  Save charts for later
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {charts.map((chartOptions, index) => (
                <EnhancedChartRenderer
                  key={index}
                  options={chartOptions}
                  data={data}
                  fileId={fileId || ''}
                  onSaveSuccess={handleSaveSuccess}
                  onDelete={() => handleDeleteChart(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileAnalysis;