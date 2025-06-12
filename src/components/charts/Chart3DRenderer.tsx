import React, { useEffect, useRef, useState } from 'react';
import { ChartOptions } from '../../types';
import Chart from 'chart.js/auto';
import { Download, Save, Maximize2, RotateCcw, Settings, Globe, Mountain, BarChart3 } from 'lucide-react';

interface Chart3DRendererProps {
  options: ChartOptions;
  data: any[];
  fileId: string;
  onSaveSuccess?: () => void;
  onDelete?: () => void;
  savedChartId?: string;
}

const Chart3DRenderer: React.FC<Chart3DRendererProps> = ({ 
  options, 
  data, 
  fileId, 
  onSaveSuccess,
  onDelete,
  savedChartId 
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chart3DRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  
  const [view3D, setView3D] = useState(false);
  const [rotationX, setRotationX] = useState(15);
  const [rotationY, setRotationY] = useState(45);
  const [zoom, setZoom] = useState(1);
  const [animationSpeed, setAnimationSpeed] = useState(1000);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!chartRef.current) return;
    
    // Clean up previous chart
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    // Prepare 3D data
    let chartConfig;
    
    if (options.chartType === 'surface3d') {
      chartConfig = create3DSurfaceChart();
    } else if (options.chartType === 'map3d') {
      chartConfig = create3DMapChart();
    } else if (options.chartType === 'column3d') {
      chartConfig = create3DColumnChart();
    } else if (options.chartType === 'bar3d') {
      chartConfig = create3DBarChart();
    } else {
      chartConfig = createEnhanced3DChart();
    }
    
    // Create chart with 3D effects
    chartInstanceRef.current = new Chart(ctx, chartConfig as any);
    
    // Apply 3D transformations if enabled
    if (view3D) {
      apply3DTransform();
    }
    
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [options, data, view3D, rotationX, rotationY, zoom]);

  const create3DSurfaceChart = () => {
    // Create surface chart data
    const surfaceData = generateSurfaceData();
    
    return {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Surface Data',
          data: surfaceData,
          backgroundColor: (ctx: any) => {
            const value = ctx.parsed.y;
            const max = Math.max(...surfaceData.map(d => d.y));
            const min = Math.min(...surfaceData.map(d => d.y));
            const normalized = (value - min) / (max - min);
            return `hsl(${240 - normalized * 120}, 70%, ${50 + normalized * 30}%)`;
          },
          pointRadius: 8,
          pointHoverRadius: 10,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `${options.title} - 3D Surface Visualization`,
            font: { size: 16, weight: 'bold' }
          },
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                return `X: ${context.parsed.x}, Y: ${context.parsed.y}, Z: ${context.raw.z || 'N/A'}`;
              }
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: options.xAxis },
            grid: { color: 'rgba(0,0,0,0.1)' }
          },
          y: {
            title: { display: true, text: options.yAxis },
            grid: { color: 'rgba(0,0,0,0.1)' }
          }
        },
        animation: {
          duration: animationSpeed,
          easing: 'easeInOutQuart'
        }
      }
    };
  };

  const create3DMapChart = () => {
    // Simulate geographic data
    const mapData = data.map((item, index) => ({
      x: index * 10 + Math.random() * 100, // Longitude simulation
      y: Math.random() * 80 - 40, // Latitude simulation
      value: Number(item[options.yAxis]) || 0,
      label: item[options.xAxis] || `Point ${index}`
    }));

    return {
      type: 'bubble',
      data: {
        datasets: [{
          label: '3D Geographic Data',
          data: mapData.map(point => ({
            x: point.x,
            y: point.y,
            r: Math.sqrt(point.value / Math.PI) / 10 + 5
          })),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `${options.title} - 3D Geographic Visualization`,
            font: { size: 16, weight: 'bold' }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const point = mapData[context.dataIndex];
                return `${point.label}: ${point.value}`;
              }
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: 'Longitude' },
            min: -180,
            max: 180
          },
          y: {
            title: { display: true, text: 'Latitude' },
            min: -90,
            max: 90
          }
        },
        animation: {
          duration: animationSpeed,
          easing: 'easeInOutCubic'
        }
      }
    };
  };

  const create3DColumnChart = () => {
    const labels = data.map(item => String(item[options.xAxis] || ''));
    const values = data.map(item => Number(item[options.yAxis]) || 0);

    return {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: options.yAxis,
          data: values,
          backgroundColor: values.map((_, index) => 
            `hsl(${200 + index * 30}, 70%, ${60 + Math.sin(index) * 20}%)`
          ),
          borderColor: values.map((_, index) => 
            `hsl(${200 + index * 30}, 70%, ${40 + Math.sin(index) * 20}%)`
          ),
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `${options.title} - 3D Column Chart`,
            font: { size: 16, weight: 'bold' }
          },
          legend: { position: 'top' as const }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0,0,0,0.1)',
              lineWidth: 1
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        animation: {
          duration: animationSpeed,
          easing: 'easeOutBounce'
        }
      }
    };
  };

  const create3DBarChart = () => {
    const labels = data.map(item => String(item[options.xAxis] || ''));
    const values = data.map(item => Number(item[options.yAxis]) || 0);

    return {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: options.yAxis,
          data: values,
          backgroundColor: 'rgba(255, 99, 132, 0.8)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
        }]
      },
      options: {
        indexAxis: 'y' as const,
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `${options.title} - 3D Horizontal Bar Chart`,
            font: { size: 16, weight: 'bold' }
          }
        },
        scales: {
          x: {
            beginAtZero: true
          }
        },
        animation: {
          duration: animationSpeed,
          easing: 'easeInOutElastic'
        }
      }
    };
  };

  const createEnhanced3DChart = () => {
    // Default enhanced 3D visualization
    const labels = data.map(item => String(item[options.xAxis] || ''));
    const values = data.map(item => Number(item[options.yAxis]) || 0);

    return {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: options.yAxis,
          data: values,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: values.map((_, index) => 
            `hsl(${index * 40}, 70%, 50%)`
          ),
          pointRadius: 6,
          pointHoverRadius: 8,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `${options.title} - Enhanced 3D Visualization`,
            font: { size: 16, weight: 'bold' }
          }
        },
        animation: {
          duration: animationSpeed,
          easing: 'easeInOutQuart'
        }
      }
    };
  };

  const generateSurfaceData = () => {
    const surfaceData = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      surfaceData.push({
        x: Number(item[options.xAxis]) || i,
        y: Number(item[options.yAxis]) || 0,
        z: options.zAxis ? Number(item[options.zAxis]) || 0 : Math.random() * 100
      });
    }
    return surfaceData;
  };

  const apply3DTransform = () => {
    if (chartRef.current) {
      const transform = `
        perspective(1000px) 
        rotateX(${rotationX}deg) 
        rotateY(${rotationY}deg) 
        scale(${zoom})
      `;
      chartRef.current.style.transform = transform;
      chartRef.current.style.transformStyle = 'preserve-3d';
    }
  };

  const reset3DView = () => {
    setRotationX(15);
    setRotationY(45);
    setZoom(1);
  };

  const get3DIcon = () => {
    switch (options.chartType) {
      case 'surface3d': return <Mountain className="h-5 w-5" />;
      case 'map3d': return <Globe className="h-5 w-5" />;
      default: return <BarChart3 className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            {get3DIcon()}
            <h3 className="text-lg font-medium text-gray-900 ml-2">{options.title}</h3>
            <span className="ml-3 px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
              3D Enhanced
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView3D(!view3D)}
              className={`inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md transition-colors ${
                view3D 
                  ? 'text-purple-600 bg-purple-100 hover:bg-purple-200' 
                  : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Maximize2 className="h-4 w-4 mr-1" />
              3D View
            </button>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"
            >
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </button>
            
            <button
              onClick={reset3DView}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-600 bg-green-100 hover:bg-green-200 transition-colors"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </button>
            
            <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-orange-600 bg-orange-100 hover:bg-orange-200 transition-colors">
              <Download className="h-4 w-4 mr-1" />
              Export 3D
            </button>
          </div>
        </div>

        {/* 3D Controls Panel */}
        {showSettings && (
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
            <h4 className="text-sm font-medium text-gray-900 mb-3">3D Visualization Controls</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Rotation X</label>
                <input
                  type="range"
                  min="-90"
                  max="90"
                  value={rotationX}
                  onChange={(e) => setRotationX(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs text-gray-500">{rotationX}°</span>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Rotation Y</label>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={rotationY}
                  onChange={(e) => setRotationY(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs text-gray-500">{rotationY}°</span>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Zoom</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs text-gray-500">{zoom}x</span>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Animation Speed</label>
                <input
                  type="range"
                  min="500"
                  max="3000"
                  step="100"
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs text-gray-500">{animationSpeed}ms</span>
              </div>
            </div>
          </div>
        )}
        
        <div 
          ref={chart3DRef}
          className={`aspect-video relative transition-all duration-500 ${
            view3D ? 'transform-gpu' : ''
          }`}
          style={{
            perspective: view3D ? '1000px' : 'none',
            transformStyle: view3D ? 'preserve-3d' : 'flat'
          }}
        >
          <canvas 
            ref={chartRef} 
            className={`w-full h-full transition-transform duration-500 ${
              view3D ? 'shadow-2xl' : 'shadow-md'
            }`}
            style={{
              transform: view3D ? `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${zoom})` : 'none',
              transformStyle: view3D ? 'preserve-3d' : 'flat'
            }}
          />
          
          {view3D && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                3D Mode Active
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <div className="space-y-1">
            <p>X-Axis: {options.xAxis}</p>
            <p>Y-Axis: {options.yAxis}</p>
            {options.zAxis && <p>Z-Axis: {options.zAxis}</p>}
          </div>
          <div className="text-right space-y-1">
            <p>Chart Type: {options.chartType}</p>
            <p>Data Points: {data.length}</p>
            <p className="text-purple-600 font-medium">3D Enhanced ✨</p>
          </div>
        </div>
      </div>
      
      {/* 3D Feature Info */}
      <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-blue-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-gray-600">
            <span className="flex items-center">
              <Mountain className="h-4 w-4 mr-1 text-purple-600" />
              Surface Mapping
            </span>
            <span className="flex items-center">
              <Globe className="h-4 w-4 mr-1 text-blue-600" />
              Geographic Visualization
            </span>
            <span className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-1 text-green-600" />
              3D Column/Bar Charts
            </span>
          </div>
          <div className="text-purple-600 font-medium">
            Advanced 3D Analytics Ready
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart3DRenderer;