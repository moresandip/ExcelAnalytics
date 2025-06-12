import React, { useState } from 'react';
import { ChartOptions } from '../../types';
import { Globe, Mountain, BarChart3, Layers, Map, Zap } from 'lucide-react';

interface Chart3DCreatorProps {
  columns: string[];
  onCreateChart: (options: ChartOptions) => void;
}

const Chart3DCreator: React.FC<Chart3DCreatorProps> = ({ columns, onCreateChart }) => {
  const [chartType, setChartType] = useState<string>('column3d');
  const [title, setTitle] = useState('');
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [zAxis, setZAxis] = useState('');
  const [mapType, setMapType] = useState('geographic');
  const [surfaceType, setSurfaceType] = useState('height');

  const chart3DTypes = [
    {
      id: 'column3d',
      name: '3D Column Chart',
      icon: <BarChart3 className="h-5 w-5" />,
      description: 'Enhanced column charts with 3D depth and rotation',
      useCase: 'Sales data, revenue comparison, product performance'
    },
    {
      id: 'bar3d',
      name: '3D Bar Chart',
      icon: <BarChart3 className="h-5 w-5" />,
      description: 'Horizontal bar charts with 3D perspective',
      useCase: 'Rankings, comparisons, horizontal data display'
    },
    {
      id: 'surface3d',
      name: '3D Surface Chart',
      icon: <Mountain className="h-5 w-5" />,
      description: 'Scientific visualization for three-variable relationships',
      useCase: 'Temperature data, elevation maps, statistical surfaces'
    },
    {
      id: 'map3d',
      name: '3D Geographic Map',
      icon: <Globe className="h-5 w-5" />,
      description: 'Geographic data visualization with location mapping',
      useCase: 'Sales by region, population data, geographic analysis'
    },
    {
      id: 'terrain3d',
      name: '3D Terrain Chart',
      icon: <Layers className="h-5 w-5" />,
      description: 'Terrain-like visualization for complex data landscapes',
      useCase: 'Market analysis, risk assessment, multi-dimensional data'
    },
    {
      id: 'bubble3d',
      name: '3D Bubble Chart',
      icon: <Map className="h-5 w-5" />,
      description: 'Multi-dimensional bubble charts with depth',
      useCase: 'Portfolio analysis, customer segmentation, correlation studies'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const chartOptions: ChartOptions = {
      title: title || `3D ${chart3DTypes.find(t => t.id === chartType)?.name || 'Chart'}`,
      chartType: chartType as any,
      xAxis,
      yAxis,
      zAxis: zAxis || undefined
    };

    onCreateChart(chartOptions);
  };

  const selectedChart = chart3DTypes.find(t => t.id === chartType);
  const requiresZAxis = ['surface3d', 'terrain3d', 'bubble3d'].includes(chartType);
  const isGeographic = chartType === 'map3d';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center mb-2">
          <Zap className="h-6 w-6 mr-2 text-purple-600" />
          🚀 3D Chart Creator
        </h3>
        <p className="text-gray-600 text-sm">
          Create advanced 3D visualizations with geographic mapping, surface charts, and enhanced depth
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Chart Title */}
        <div>
          <label htmlFor="chart-title" className="block text-sm font-medium text-gray-700 mb-2">
            Chart Title
          </label>
          <input
            type="text"
            id="chart-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter 3D chart title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        
        {/* 3D Chart Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            3D Chart Type
          </label>
          <div className="grid grid-cols-1 gap-3">
            {chart3DTypes.map((type) => (
              <div
                key={type.id}
                className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                  chartType === type.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                }`}
                onClick={() => setChartType(type.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${
                    chartType === type.id ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {type.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">{type.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                    <p className="text-xs text-purple-600 mt-1 font-medium">
                      💡 {type.useCase}
                    </p>
                  </div>
                  <input
                    type="radio"
                    name="chartType"
                    value={type.id}
                    checked={chartType === type.id}
                    onChange={() => setChartType(type.id)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Chart Info */}
        {selectedChart && (
          <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
            <div className="flex items-center mb-2">
              <div className="h-8 w-8 rounded-lg bg-purple-500 text-white flex items-center justify-center mr-3">
                {selectedChart.icon}
              </div>
              <h4 className="font-medium text-gray-900">{selectedChart.name}</h4>
            </div>
            <p className="text-sm text-gray-600 mb-2">{selectedChart.description}</p>
            <p className="text-xs text-purple-700 font-medium">
              Best for: {selectedChart.useCase}
            </p>
          </div>
        )}
        
        {/* Axis Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="x-axis" className="block text-sm font-medium text-gray-700 mb-2">
              {isGeographic ? 'Location/Region Column' : 'X-Axis Column'}
            </label>
            <select
              id="x-axis"
              value={xAxis}
              onChange={(e) => setXAxis(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            >
              <option value="">Select {isGeographic ? 'Location' : 'X-Axis'} Column</option>
              {columns.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="y-axis" className="block text-sm font-medium text-gray-700 mb-2">
              {isGeographic ? 'Value Column' : 'Y-Axis Column'}
            </label>
            <select
              id="y-axis"
              value={yAxis}
              onChange={(e) => setYAxis(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            >
              <option value="">Select {isGeographic ? 'Value' : 'Y-Axis'} Column</option>
              {columns.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Z-Axis for 3D charts */}
        {requiresZAxis && (
          <div>
            <label htmlFor="z-axis" className="block text-sm font-medium text-gray-700 mb-2">
              Z-Axis Column (Depth/Height)
            </label>
            <select
              id="z-axis"
              value={zAxis}
              onChange={(e) => setZAxis(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required={requiresZAxis}
            >
              <option value="">Select Z-Axis Column</option>
              {columns.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Geographic Options */}
        {isGeographic && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Geographic Visualization Options</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Map Type</label>
                <select
                  value={mapType}
                  onChange={(e) => setMapType(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="geographic">Geographic Regions</option>
                  <option value="heatmap">Heat Map</option>
                  <option value="bubble">Bubble Map</option>
                  <option value="choropleth">Choropleth</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Visualization Style</label>
                <select
                  value={surfaceType}
                  onChange={(e) => setSurfaceType(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="height">Height-based</option>
                  <option value="color">Color-coded</option>
                  <option value="size">Size-based</option>
                  <option value="combined">Combined</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Surface Chart Options */}
        {chartType === 'surface3d' && (
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Surface Chart Options</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Surface Type</label>
                <select
                  value={surfaceType}
                  onChange={(e) => setSurfaceType(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="smooth">Smooth Surface</option>
                  <option value="wireframe">Wireframe</option>
                  <option value="contour">Contour Lines</option>
                  <option value="gradient">Gradient Fill</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Color Scheme</label>
                <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="terrain">Terrain</option>
                  <option value="ocean">Ocean</option>
                  <option value="rainbow">Rainbow</option>
                  <option value="thermal">Thermal</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
        {/* Generate Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all transform hover:scale-105"
          >
            <Zap className="h-5 w-5 mr-2" />
            Generate 3D Chart
          </button>
        </div>
      </form>

      {/* Feature Highlights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg border border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">🚀 3D Features Available</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-600">
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✅</span>
            Interactive 3D rotation & zoom
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✅</span>
            Geographic mapping & visualization
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✅</span>
            Surface & terrain analysis
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✅</span>
            Multi-dimensional data support
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✅</span>
            Advanced animation controls
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✅</span>
            Export in multiple 3D formats
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart3DCreator;