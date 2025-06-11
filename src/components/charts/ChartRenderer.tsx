import React, { useEffect, useRef } from 'react';
import { ChartOptions } from '../../types';
import Chart from 'chart.js/auto';
import { Download } from 'lucide-react';

interface ChartRendererProps {
  options: ChartOptions;
  data: any[];
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ options, data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

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

  const downloadChart = () => {
    if (!chartRef.current) return;
    
    // Create download link
    const link = document.createElement('a');
    link.download = `${options.title.replace(/\s+/g, '_')}.png`;
    link.href = chartRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">{options.title}</h3>
        <button
          onClick={downloadChart}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"
        >
          <Download className="h-4 w-4 mr-1" />
          Download
        </button>
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
  );
};

export default ChartRenderer;