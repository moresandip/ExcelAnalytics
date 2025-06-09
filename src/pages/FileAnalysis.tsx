import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ChartCreator } from '../components/charts';
import EnhancedChartRenderer from '../components/charts/EnhancedChartRenderer';
import { ChartOptions } from '../types';
import { Save, Download, Trash2, AlertCircle, BarChart3, History } from 'lucide-react';
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

  useEffect(() => {
    const fetchFileData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Mock API call to fetch file data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock file data
        if (fileId === '1') {
          setFileName('sales_data_2024.xlsx');
          setColumns(['Month', 'Region', 'Sales', 'Profit']);
          setData([
            { Month: 'January', Region: 'North', Sales: 12500, Profit: 3750 },
            { Month: 'February', Region: 'North', Sales: 13200, Profit: 3960 },
            { Month: 'March', Region: 'North', Sales: 15800, Profit: 4740 },
            { Month: 'January', Region: 'South', Sales: 9800, Profit: 2940 },
            { Month: 'February', Region: 'South', Sales: 10300, Profit: 3090 },
            { Month: 'March', Region: 'South', Sales: 11500, Profit: 3450 },
            { Month: 'January', Region: 'East', Sales: 14200, Profit: 4260 },
            { Month: 'February', Region: 'East', Sales: 15100, Profit: 4530 },
            { Month: 'March', Region: 'East', Sales: 16800, Profit: 5040 },
            { Month: 'January', Region: 'West', Sales: 10900, Profit: 3270 },
            { Month: 'February', Region: 'West', Sales: 11700, Profit: 3510 },
            { Month: 'March', Region: 'West', Sales: 13400, Profit: 4020 },
          ]);
        } else if (fileId === '2') {
          setFileName('marketing_metrics.xlsx');
          setColumns(['Campaign', 'Clicks', 'Conversions', 'Cost']);
          setData([
            { Campaign: 'Facebook Ads', Clicks: 12500, Conversions: 375, Cost: 3750 },
            { Campaign: 'Google Ads', Clicks: 18200, Conversions: 546, Cost: 5460 },
            { Campaign: 'LinkedIn', Clicks: 5800, Conversions: 116, Cost: 2320 },
            { Campaign: 'Twitter', Clicks: 7800, Conversions: 156, Cost: 1560 },
            { Campaign: 'Instagram', Clicks: 10300, Conversions: 309, Cost: 3090 },
            { Campaign: 'TikTok', Clicks: 15500, Conversions: 465, Cost: 4650 },
          ]);
        } else if (fileId === '3') {
          setFileName('financial_report_q2.xlsx');
          setColumns(['Month', 'Revenue', 'Expenses', 'Profit']);
          setData([
            { Month: 'April', Revenue: 125000, Expenses: 87500, Profit: 37500 },
            { Month: 'May', Revenue: 132000, Expenses: 92400, Profit: 39600 },
            { Month: 'June', Revenue: 158000, Expenses: 110600, Profit: 47400 },
          ]);
        } else {
          // Generic mock data for any other file ID
          setFileName(`excel_file_${fileId}.xlsx`);
          setColumns(['Category', 'Value1', 'Value2', 'Value3']);
          setData([
            { Category: 'A', Value1: 100, Value2: 200, Value3: 300 },
            { Category: 'B', Value1: 150, Value2: 250, Value3: 350 },
            { Category: 'C', Value1: 200, Value2: 300, Value3: 400 },
            { Category: 'D', Value1: 250, Value2: 350, Value3: 450 },
            { Category: 'E', Value1: 300, Value2: 400, Value3: 500 },
          ]);
        }
        
        // Check if we should load a specific chart from URL params
        const chartId = searchParams.get('chart');
        if (chartId) {
          // In a real app, this would load the specific chart configuration
          // For now, we'll add a sample chart
          setCharts([{
            title: 'Sample Saved Chart',
            chartType: 'bar',
            xAxis: columns[0],
            yAxis: columns[1],
          }]);
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
  };

  const handleDeleteChart = (index: number) => {
    setCharts(prevCharts => prevCharts.filter((_, i) => i !== index));
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analyzing: {fileName}</h1>
            <p className="text-gray-600 mt-2">
              Create charts and visualizations from your data with AI-powered insights
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <History className="h-4 w-4 mr-2" />
              {showHistory ? 'Hide' : 'Show'} History
            </button>
            <button
              onClick={handleSaveAnalysis}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Analysis
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {saveSuccess && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <div className="flex items-start">
            <BarChart3 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <p className="text-sm text-green-700">Chart saved successfully!</p>
          </div>
        </div>
      )}

      {showHistory && (
        <div className="mb-8">
          <SavedChartsHistory />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ChartCreator columns={columns} onCreateChart={handleCreateChart} />
          
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Data Preview</h3>
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
                    <tr key={rowIndex} className="hover:bg-gray-50">
                      {columns.map((column, colIndex) => (
                        <td key={colIndex} className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                          {row[column]?.toString() || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {data.length > 5 && (
                <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500">
                  Showing 5 of {data.length} rows
                </div>
              )}
            </div>
            
            <div className="mt-4 flex justify-between">
              <span className="text-sm text-gray-500">
                {data.length} rows × {columns.length} columns
              </span>
              <button className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                <Download className="h-4 w-4 mr-1" />
                Download Data
              </button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          {charts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center justify-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Charts Yet</h3>
              <p className="text-gray-500 mb-4">
                Use the chart creator on the left to visualize your data. Select your axes and chart type to get started.
              </p>
              <div className="text-sm text-gray-400">
                <p>✨ AI-powered insights available</p>
                <p>📊 Multiple export formats</p>
                <p>💾 Save charts for later</p>
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