import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ChartCreator } from '../components/charts';
import EnhancedChartRenderer from '../components/charts/EnhancedChartRenderer';
import Chart3DRenderer from '../components/charts/Chart3DRenderer';
import Chart3DCreator from '../components/charts/Chart3DCreator';
import PowerMapVisualization from '../components/charts/PowerMapVisualization';
import { ChartOptions } from '../types';
import { Save, Download, Trash2, AlertCircle, BarChart3, History, Zap, TrendingUp, FileText, Eye, Globe, Mountain, Layers, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import SavedChartsHistory from '../components/charts/SavedChartsHistory';

const FileAnalysis: React.FC = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [fileName, setFileName] = useState('');
  const [columns, setColumns] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [charts, setCharts] = useState<ChartOptions[]>([]);
  const [currentChartIndex, setCurrentChartIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'2d' | '3d' | 'powermap'>('2d');
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
          setColumns(['Month', 'Region', 'Sales', 'Profit', 'Units_Sold', 'Customer_Count', 'Latitude', 'Longitude']);
          const mockData = [
            { Month: 'January', Region: 'North', Sales: 12500, Profit: 3750, Units_Sold: 125, Customer_Count: 89, Latitude: 45.5, Longitude: -100.2 },
            { Month: 'February', Region: 'North', Sales: 13200, Profit: 3960, Units_Sold: 132, Customer_Count: 94, Latitude: 45.8, Longitude: -99.8 },
            { Month: 'March', Region: 'North', Sales: 15800, Profit: 4740, Units_Sold: 158, Customer_Count: 112, Latitude: 46.1, Longitude: -100.5 },
            { Month: 'April', Region: 'North', Sales: 14200, Profit: 4260, Units_Sold: 142, Customer_Count: 101, Latitude: 45.7, Longitude: -100.1 },
            { Month: 'May', Region: 'North', Sales: 16800, Profit: 5040, Units_Sold: 168, Customer_Count: 119, Latitude: 46.0, Longitude: -99.9 },
            { Month: 'January', Region: 'South', Sales: 9800, Profit: 2940, Units_Sold: 98, Customer_Count: 67, Latitude: 30.2, Longitude: -90.1 },
            { Month: 'February', Region: 'South', Sales: 10300, Profit: 3090, Units_Sold: 103, Customer_Count: 71, Latitude: 30.5, Longitude: -89.8 },
            { Month: 'March', Region: 'South', Sales: 11500, Profit: 3450, Units_Sold: 115, Customer_Count: 78, Latitude: 30.8, Longitude: -90.3 },
            { Month: 'April', Region: 'South', Sales: 12100, Profit: 3630, Units_Sold: 121, Customer_Count: 82, Latitude: 30.4, Longitude: -90.0 },
            { Month: 'May', Region: 'South', Sales: 13400, Profit: 4020, Units_Sold: 134, Customer_Count: 91, Latitude: 30.7, Longitude: -89.9 },
            { Month: 'January', Region: 'East', Sales: 14200, Profit: 4260, Units_Sold: 142, Customer_Count: 98, Latitude: 40.7, Longitude: -74.0 },
            { Month: 'February', Region: 'East', Sales: 15100, Profit: 4530, Units_Sold: 151, Customer_Count: 104, Latitude: 40.8, Longitude: -73.9 },
            { Month: 'March', Region: 'East', Sales: 16800, Profit: 5040, Units_Sold: 168, Customer_Count: 115, Latitude: 40.9, Longitude: -74.1 },
            { Month: 'April', Region: 'East', Sales: 17500, Profit: 5250, Units_Sold: 175, Customer_Count: 121, Latitude: 40.6, Longitude: -74.0 },
            { Month: 'May', Region: 'East', Sales: 18900, Profit: 5670, Units_Sold: 189, Customer_Count: 130, Latitude: 40.8, Longitude: -73.8 },
            { Month: 'January', Region: 'West', Sales: 10900, Profit: 3270, Units_Sold: 109, Customer_Count: 76, Latitude: 34.0, Longitude: -118.2 },
            { Month: 'February', Region: 'West', Sales: 11700, Profit: 3510, Units_Sold: 117, Customer_Count: 81, Latitude: 34.1, Longitude: -118.3 },
            { Month: 'March', Region: 'West', Sales: 13400, Profit: 4020, Units_Sold: 134, Customer_Count: 92, Latitude: 34.2, Longitude: -118.1 },
            { Month: 'April', Region: 'West', Sales: 14800, Profit: 4440, Units_Sold: 148, Customer_Count: 102, Latitude: 33.9, Longitude: -118.2 },
            { Month: 'May', Region: 'West', Sales: 15600, Profit: 4680, Units_Sold: 156, Customer_Count: 107, Latitude: 34.0, Longitude: -118.0 },
          ];
          setData(mockData);
          setAnalysisStats({
            totalRows: mockData.length,
            totalColumns: 8,
            chartsCreated: 0,
            lastModified: new Date().toISOString()
          });
        } else if (fileId === '2') {
          setFileName('marketing_metrics.xlsx');
          setColumns(['Campaign', 'Clicks', 'Conversions', 'Cost', 'CTR', 'CPC', 'Region', 'Month']);
          const mockData = [
            { Campaign: 'Facebook Ads', Clicks: 12500, Conversions: 375, Cost: 3750, CTR: 2.8, CPC: 0.30, Region: 'North', Month: 'January' },
            { Campaign: 'Google Ads', Clicks: 18200, Conversions: 546, Cost: 5460, CTR: 3.2, CPC: 0.30, Region: 'South', Month: 'January' },
            { Campaign: 'LinkedIn', Clicks: 5800, Conversions: 116, Cost: 2320, CTR: 1.9, CPC: 0.40, Region: 'East', Month: 'February' },
            { Campaign: 'Twitter', Clicks: 7800, Conversions: 156, Cost: 1560, CTR: 2.1, CPC: 0.20, Region: 'West', Month: 'February' },
            { Campaign: 'Instagram', Clicks: 10300, Conversions: 309, Cost: 3090, CTR: 3.5, CPC: 0.30, Region: 'North', Month: 'March' },
            { Campaign: 'TikTok', Clicks: 15500, Conversions: 465, Cost: 4650, CTR: 4.1, CPC: 0.30, Region: 'South', Month: 'March' },
            { Campaign: 'YouTube', Clicks: 9200, Conversions: 184, Cost: 2760, CTR: 2.4, CPC: 0.30, Region: 'East', Month: 'April' },
            { Campaign: 'Pinterest', Clicks: 4100, Conversions: 82, Cost: 1230, CTR: 1.8, CPC: 0.30, Region: 'West', Month: 'April' },
          ];
          setData(mockData);
          setAnalysisStats({
            totalRows: mockData.length,
            totalColumns: 8,
            chartsCreated: 0,
            lastModified: new Date(Date.now() - 86400000).toISOString()
          });
        } else if (fileId === '3') {
          setFileName('financial_report_q2.xlsx');
          setColumns(['Month', 'Revenue', 'Expenses', 'Profit', 'Growth_Rate', 'Margin', 'Department', 'Quarter']);
          const mockData = [
            { Month: 'April', Revenue: 125000, Expenses: 87500, Profit: 37500, Growth_Rate: 5.2, Margin: 30.0, Department: 'Sales', Quarter: 'Q2' },
            { Month: 'May', Revenue: 132000, Expenses: 92400, Profit: 39600, Growth_Rate: 5.6, Margin: 30.0, Department: 'Marketing', Quarter: 'Q2' },
            { Month: 'June', Revenue: 158000, Expenses: 110600, Profit: 47400, Growth_Rate: 19.7, Margin: 30.0, Department: 'Operations', Quarter: 'Q2' },
          ];
          setData(mockData);
          setAnalysisStats({
            totalRows: mockData.length,
            totalColumns: 8,
            chartsCreated: 0,
            lastModified: new Date(Date.now() - 86400000 * 3).toISOString()
          });
        } else {
          // Enhanced generic mock data with geographic coordinates
          setFileName(`excel_file_${fileId}.xlsx`);
          setColumns(['Category', 'Value1', 'Value2', 'Value3', 'Percentage', 'Status', 'City', 'Temperature']);
          const mockData = [
            { Category: 'Product A', Value1: 100, Value2: 200, Value3: 300, Percentage: 25.5, Status: 'Active', City: 'New York', Temperature: 22.5 },
            { Category: 'Product B', Value1: 150, Value2: 250, Value3: 350, Percentage: 30.2, Status: 'Active', City: 'California', Temperature: 28.1 },
            { Category: 'Product C', Value1: 200, Value2: 300, Value3: 400, Percentage: 35.8, Status: 'Pending', City: 'Texas', Temperature: 31.7 },
            { Category: 'Product D', Value1: 250, Value2: 350, Value3: 450, Percentage: 40.1, Status: 'Active', City: 'Florida', Temperature: 29.3 },
            { Category: 'Product E', Value1: 300, Value2: 400, Value3: 500, Percentage: 45.7, Status: 'Inactive', City: 'London', Temperature: 18.9 },
          ];
          setData(mockData);
          setAnalysisStats({
            totalRows: mockData.length,
            totalColumns: 8,
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
    setCurrentChartIndex(charts.length); // Set to the new chart index
    setAnalysisStats(prev => ({ 
      ...prev, 
      chartsCreated: prev.chartsCreated + 1,
      lastModified: new Date().toISOString()
    }));
  };

  const handleDeleteChart = (index: number) => {
    setCharts(prevCharts => prevCharts.filter((_, i) => i !== index));
    // Adjust current chart index if necessary
    if (currentChartIndex >= charts.length - 1) {
      setCurrentChartIndex(Math.max(0, charts.length - 2));
    }
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

  const hasGeographicData = columns.some(col => 
    col.toLowerCase().includes('lat') || 
    col.toLowerCase().includes('lng') || 
    col.toLowerCase().includes('longitude') ||
    col.toLowerCase().includes('city') ||
    col.toLowerCase().includes('region') ||
    col.toLowerCase().includes('location')
  );

  const hasTimeData = columns.some(col =>
    col.toLowerCase().includes('date') ||
    col.toLowerCase().includes('time') ||
    col.toLowerCase().includes('month') ||
    col.toLowerCase().includes('year')
  );

  const goToPreviousChart = () => {
    setCurrentChartIndex(prev => Math.max(0, prev - 1));
  };

  const goToNextChart = () => {
    setCurrentChartIndex(prev => Math.min(charts.length - 1, prev + 1));
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
              🚀 Advanced 3D Analytics: {fileName}
            </h1>
            <p className="text-gray-600 mt-2">
              Create 2D charts, 3D visualizations, geographic maps, and get AI insights with export capabilities
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
              {hasGeographicData && (
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1 text-blue-500" />
                  <span>Geographic data detected</span>
                </div>
              )}
              {hasTimeData && (
                <div className="flex items-center">
                  <History className="h-4 w-4 mr-1 text-orange-500" />
                  <span>Time-series data detected</span>
                </div>
              )}
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
              <h3 className="text-lg font-semibold text-gray-900">🌟 Complete 3D Analytics Suite Active - One Chart Display Mode</h3>
              <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Single Chart Focus
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Chart Navigation
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  2D & 3D Charts
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Geographic Mapping
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">One Chart at a Time</p>
            <p className="text-xs text-gray-500">Better Focus • Cleaner UI</p>
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

      {/* Visualization Type Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('2d')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === '2d'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                📊 2D Charts
              </div>
            </button>
            <button
              onClick={() => setActiveTab('3d')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === '3d'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Mountain className="h-5 w-5 mr-2" />
                🏔️ 3D Visualizations
              </div>
            </button>
            {hasGeographicData && (
              <button
                onClick={() => setActiveTab('powermap')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'powermap'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  🌍 Power Map
                </div>
              </button>
            )}
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          {/* Chart Creator based on active tab */}
          {activeTab === '2d' && (
            <ChartCreator columns={columns} onCreateChart={handleCreateChart} />
          )}
          
          {activeTab === '3d' && (
            <Chart3DCreator columns={columns} onCreateChart={handleCreateChart} />
          )}
          
          {activeTab === 'powermap' && hasGeographicData && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                <Globe className="h-6 w-6 mr-2 text-green-600" />
                🌍 Power Map Settings
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Geographic data detected! Power Map visualization is ready below.
              </p>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  3D Globe visualization
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Interactive rotation & zoom
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Time-based animation
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Multiple visualization types
                </div>
              </div>
            </div>
          )}
          
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
          {/* Power Map Visualization */}
          {activeTab === 'powermap' && hasGeographicData && (
            <div className="space-y-8">
              <PowerMapVisualization
                data={data}
                locationColumn={columns.find(col => 
                  col.toLowerCase().includes('region') || 
                  col.toLowerCase().includes('city') ||
                  col.toLowerCase().includes('location')
                ) || columns[0]}
                valueColumn={columns.find(col => 
                  col.toLowerCase().includes('sales') || 
                  col.toLowerCase().includes('value') ||
                  col.toLowerCase().includes('revenue')
                ) || columns[1]}
                timeColumn={hasTimeData ? columns.find(col =>
                  col.toLowerCase().includes('month') ||
                  col.toLowerCase().includes('date') ||
                  col.toLowerCase().includes('time')
                ) : undefined}
                onExport={() => console.log('Exporting Power Map...')}
              />
            </div>
          )}

          {/* Single Chart Display */}
          {(activeTab === '2d' || activeTab === '3d') && (
            <>
              {charts.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-12 flex flex-col items-center justify-center text-center border border-gray-100">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-full mb-6">
                    {activeTab === '3d' ? (
                      <Mountain className="h-12 w-12 text-purple-600" />
                    ) : (
                      <BarChart3 className="h-12 w-12 text-blue-600" />
                    )}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    Ready to Create {activeTab === '3d' ? '3D' : '2D'} Charts
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md">
                    Use the chart creator on the left to visualize your data with {activeTab === '3d' ? '3D depth, rotation, and advanced surface mapping' : 'interactive 2D charts and AI-powered insights'}.
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
                <div className="space-y-6">
                  {/* Chart Navigation Header */}
                  <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          📊 Chart {currentChartIndex + 1} of {charts.length}
                        </h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {charts[currentChartIndex]?.chartType} chart
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={goToPreviousChart}
                          disabled={currentChartIndex === 0}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Previous
                        </button>
                        
                        <button
                          onClick={goToNextChart}
                          disabled={currentChartIndex === charts.length - 1}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          Next
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                        
                        <button
                          onClick={() => handleDeleteChart(currentChartIndex)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-red-600 bg-red-100 hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Chart Thumbnails */}
                    {charts.length > 1 && (
                      <div className="mt-4 flex space-x-2 overflow-x-auto">
                        {charts.map((chart, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentChartIndex(index)}
                            className={`flex-shrink-0 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                              index === currentChartIndex
                                ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
                            }`}
                          >
                            {index + 1}. {chart.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Current Chart Display */}
                  {charts[currentChartIndex] && (
                    <div>
                      {activeTab === '3d' || charts[currentChartIndex].chartType.includes('3d') ? (
                        <Chart3DRenderer
                          options={charts[currentChartIndex]}
                          data={data}
                          fileId={fileId || ''}
                          onSaveSuccess={handleSaveSuccess}
                          onDelete={() => handleDeleteChart(currentChartIndex)}
                        />
                      ) : (
                        <EnhancedChartRenderer
                          options={charts[currentChartIndex]}
                          data={data}
                          fileId={fileId || ''}
                          onSaveSuccess={handleSaveSuccess}
                          onDelete={() => handleDeleteChart(currentChartIndex)}
                        />
                      )}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileAnalysis;