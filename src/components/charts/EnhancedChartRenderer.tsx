import React, { useEffect, useRef, useState } from 'react';
import { ChartOptions } from '../../types';
import Chart from 'chart.js/auto';
import { Download, Save, FileImage, FileText, Lightbulb, Trash2 } from 'lucide-react';
import { DownloadUtils } from '../../utils/downloadUtils';
import { chartService } from '../../services/chartService';
import { aiService, ChartSuggestion, DataInsight } from '../../services/aiService';
import { useAuth } from '../../context/AuthContext';

interface EnhancedChartRendererProps {
  options: ChartOptions;
  data: any[];
  fileId: string;
  onSaveSuccess?: () => void;
  onDelete?: () => void;
  savedChartId?: string;
}

const EnhancedChartRenderer: React.FC<EnhancedChartRendererProps> = ({ 
  options, 
  data, 
  fileId, 
  onSaveSuccess,
  onDelete,
  savedChartId 
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const { user } = useAuth();
  
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<ChartSuggestion | null>(null);
  const [insights, setInsights] = useState<DataInsight | null>(null);
  const [showInsights, setShowInsights] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    if (!chartRef.current) return;
    
    // Clean up previous chart if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    // Extract and prepare data for the chart based on selected axes
    let labels: string[];
    let dataValues: number[];
    
    if (options.chartType === 'pie') {
      // For pie charts, aggregate data by category
      const aggregatedData = new Map<string, number>();
      
      data.forEach(item => {
        const category = String(item[options.xAxis] || 'Unknown');
        const value = Number(item[options.yAxis]) || 0;
        
        if (aggregatedData.has(category)) {
          aggregatedData.set(category, aggregatedData.get(category)! + value);
        } else {
          aggregatedData.set(category, value);
        }
      });
      
      labels = Array.from(aggregatedData.keys());
      dataValues = Array.from(aggregatedData.values());
    } else {
      // For other chart types, use data as-is but ensure labels are strings
      labels = data.map(item => String(item[options.xAxis] || ''));
      dataValues = data.map(item => Number(item[options.yAxis]) || 0);
    }
    
    // Configure chart based on chart type
    let chartConfig;
    
    switch(options.chartType) {
      case 'bar':
        chartConfig = {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label: options.yAxis,
              data: dataValues,
              backgroundColor: 'rgba(37, 99, 235, 0.7)',
              borderColor: 'rgba(37, 99, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: options.title
              },
              legend: {
                position: 'top' as const,
              },
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        };
        break;
      
      case 'line':
        chartConfig = {
          type: 'line',
          data: {
            labels,
            datasets: [{
              label: options.yAxis,
              data: dataValues,
              borderColor: 'rgba(37, 99, 235, 1)',
              backgroundColor: 'rgba(37, 99, 235, 0.1)',
              tension: 0.3,
              fill: true,
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: options.title
              }
            }
          }
        };
        break;
      
      case 'pie':
        chartConfig = {
          type: 'pie',
          data: {
            labels,
            datasets: [{
              label: options.yAxis,
              data: dataValues,
              backgroundColor: [
                'rgba(37, 99, 235, 0.7)',
                'rgba(16, 185, 129, 0.7)',
                'rgba(245, 158, 11, 0.7)',
                'rgba(239, 68, 68, 0.7)',
                'rgba(124, 58, 237, 0.7)',
                'rgba(14, 165, 233, 0.7)',
                'rgba(236, 72, 153, 0.7)',
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: options.title
              },
              legend: {
                position: 'right' as const,
              }
            }
          }
        };
        break;
      
      case 'scatter':
        chartConfig = {
          type: 'scatter',
          data: {
            datasets: [{
              label: `${options.xAxis} vs ${options.yAxis}`,
              data: data.map(item => ({
                x: Number(item[options.xAxis]) || 0,
                y: Number(item[options.yAxis]) || 0
              })),
              backgroundColor: 'rgba(37, 99, 235, 0.7)',
              borderColor: 'rgba(37, 99, 235, 1)',
              pointRadius: 5,
              pointHoverRadius: 7,
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: options.title
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: options.xAxis
                }
              },
              y: {
                title: {
                  display: true,
                  text: options.yAxis
                }
              }
            }
          }
        };
        break;
      
      case 'area':
        chartConfig = {
          type: 'line',
          data: {
            labels,
            datasets: [{
              label: options.yAxis,
              data: dataValues,
              borderColor: 'rgba(37, 99, 235, 1)',
              backgroundColor: 'rgba(37, 99, 235, 0.3)',
              tension: 0.3,
              fill: true,
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: options.title
              }
            }
          }
        };
        break;
      
      // 3D charts would typically require Three.js
      // This is a simplified placeholder that uses 2D chart with a note
      case 'column3d':
      case 'bar3d':
        chartConfig = {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label: `${options.yAxis} (3D Visualization)`,
              data: dataValues,
              backgroundColor: 'rgba(37, 99, 235, 0.7)',
              borderColor: 'rgba(37, 99, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: `${options.title} (3D charts require Three.js rendering)`
              },
            }
          }
        };
        break;
      
      default:
        chartConfig = {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label: options.yAxis,
              data: dataValues,
              backgroundColor: 'rgba(37, 99, 235, 0.7)',
              borderColor: 'rgba(37, 99, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: options.title
              }
            }
          }
        };
    }
    
    // Create chart instance
    chartInstanceRef.current = new Chart(ctx, chartConfig as any);
    
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [options, data]);

  const handleSaveChart = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      let labels: string[];
      let values: number[];
      
      if (options.chartType === 'pie') {
        // For pie charts, use aggregated data
        const aggregatedData = new Map<string, number>();
        
        data.forEach(item => {
          const category = String(item[options.xAxis] || 'Unknown');
          const value = Number(item[options.yAxis]) || 0;
          
          if (aggregatedData.has(category)) {
            aggregatedData.set(category, aggregatedData.get(category)! + value);
          } else {
            aggregatedData.set(category, value);
          }
        });
        
        labels = Array.from(aggregatedData.keys());
        values = Array.from(aggregatedData.values());
      } else {
        labels = data.map(item => String(item[options.xAxis] || ''));
        values = data.map(item => Number(item[options.yAxis]) || 0);
      }
      
      await chartService.saveChart({
        fileId,
        title: options.title,
        chartType: options.chartType,
        xAxis: options.xAxis,
        yAxis: options.yAxis,
        zAxis: options.zAxis,
        labels,
        values,
      });
      
      onSaveSuccess?.();
    } catch (error) {
      console.error('Error saving chart:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = async (format: 'png' | 'pdf' | 'jpeg' | 'csv') => {
    if (!chartContainerRef.current) return;
    
    setIsDownloading(true);
    try {
      const filename = options.title.replace(/\s+/g, '_').toLowerCase();
      
      switch (format) {
        case 'png':
          await DownloadUtils.downloadChartAsPNG(chartContainerRef.current, filename);
          break;
        case 'pdf':
          await DownloadUtils.downloadChartAsPDF(chartContainerRef.current, filename);
          break;
        case 'jpeg':
          await DownloadUtils.downloadChartAsJPEG(chartContainerRef.current, filename);
          break;
        case 'csv':
          DownloadUtils.downloadDataAsCSV(data, filename);
          break;
      }
      
      setShowDownloadMenu(false);
    } catch (error) {
      console.error('Error downloading chart:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const generateAIInsights = async () => {
    setLoadingAI(true);
    try {
      const [suggestion, dataInsights] = await Promise.all([
        aiService.suggestChartType(Object.keys(data[0] || {}), data),
        aiService.generateInsights(data, options.chartType, options.xAxis, options.yAxis)
      ]);
      
      setAiSuggestion(suggestion);
      setInsights(dataInsights);
      setShowInsights(true);
    } catch (error) {
      console.error('Error generating AI insights:', error);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6" ref={chartContainerRef}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">{options.title}</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={generateAIInsights}
              disabled={loadingAI}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-purple-600 bg-purple-100 hover:bg-purple-200 transition-colors disabled:opacity-50"
            >
              <Lightbulb className="h-4 w-4 mr-1" />
              {loadingAI ? 'Analyzing...' : 'AI Insights'}
            </button>
            
            {!savedChartId && (
              <button
                onClick={handleSaveChart}
                disabled={isSaving}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-600 bg-green-100 hover:bg-green-200 transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-1" />
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            )}
            
            <div className="relative">
              <button
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                disabled={isDownloading}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors disabled:opacity-50"
              >
                <Download className="h-4 w-4 mr-1" />
                {isDownloading ? 'Downloading...' : 'Download'}
              </button>
              
              {showDownloadMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="py-1">
                    <button
                      onClick={() => handleDownload('png')}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FileImage className="h-4 w-4 mr-2" />
                      Download as PNG
                    </button>
                    <button
                      onClick={() => handleDownload('jpeg')}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FileImage className="h-4 w-4 mr-2" />
                      Download as JPEG
                    </button>
                    <button
                      onClick={() => handleDownload('pdf')}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Download as PDF
                    </button>
                    <button
                      onClick={() => handleDownload('csv')}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Download Data (CSV)
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {onDelete && (
              <button
                onClick={onDelete}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-600 bg-red-100 hover:bg-red-200 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        
        <div className="aspect-video relative">
          <canvas ref={chartRef} className="w-full h-full"></canvas>
        </div>
        
        <div className="mt-3 text-sm text-gray-500">
          <p>X-Axis: {options.xAxis}</p>
          <p>Y-Axis: {options.yAxis}</p>
          {options.zAxis && <p>Z-Axis: {options.zAxis}</p>}
        </div>
      </div>
      
      {/* AI Insights Panel */}
      {showInsights && (insights || aiSuggestion) && (
        <div className="border-t border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50 p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium text-gray-900 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-purple-600" />
              AI Insights
            </h4>
            <button
              onClick={() => setShowInsights(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          {aiSuggestion && (
            <div className="mb-4 p-4 bg-white rounded-lg border border-purple-200">
              <h5 className="font-medium text-purple-900 mb-2">Chart Type Suggestion</h5>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Recommended:</span> {aiSuggestion.chartType.charAt(0).toUpperCase() + aiSuggestion.chartType.slice(1)} Chart
              </p>
              <p className="text-sm text-gray-600 mb-2">{aiSuggestion.reasoning}</p>
              <div className="flex items-center">
                <span className="text-xs text-gray-500">Confidence: </span>
                <div className="ml-2 flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${aiSuggestion.confidence * 100}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-xs text-gray-500">{Math.round(aiSuggestion.confidence * 100)}%</span>
              </div>
            </div>
          )}
          
          {insights && (
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <h5 className="font-medium text-blue-900 mb-2">Data Insights</h5>
              <p className="text-sm text-gray-700 mb-3">{insights.summary}</p>
              
              {insights.trends.length > 0 && (
                <div className="mb-3">
                  <h6 className="text-sm font-medium text-gray-900 mb-1">Key Trends:</h6>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {insights.trends.map((trend, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {trend}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {insights.recommendations.length > 0 && (
                <div>
                  <h6 className="text-sm font-medium text-gray-900 mb-1">Recommendations:</h6>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {insights.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedChartRenderer;