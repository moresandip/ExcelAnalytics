import React, { useState } from 'react';
import { ChartOptions } from '../../types';

interface ChartCreatorProps {
  columns: string[];
  onCreateChart: (options: ChartOptions) => void;
}

const ChartCreator: React.FC<ChartCreatorProps> = ({ columns, onCreateChart }) => {
  const [chartType, setChartType] = useState<string>('bar');
  const [title, setTitle] = useState('');
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [zAxis, setZAxis] = useState('');

  const is3DChart = chartType.includes('3d');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onCreateChart({
      title: title || 'Untitled Chart',
      chartType: chartType as any,
      xAxis,
      yAxis,
      ...(is3DChart ? { zAxis } : {})
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Create a New Chart</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="chart-title" className="block text-sm font-medium text-gray-700 mb-1">
            Chart Title
          </label>
          <input
            type="text"
            id="chart-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter chart title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="chart-type" className="block text-sm font-medium text-gray-700 mb-1">
            Chart Type
          </label>
          <select
            id="chart-type"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <optgroup label="2D Charts">
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="pie">Pie Chart</option>
              <option value="scatter">Scatter Plot</option>
              <option value="area">Area Chart</option>
              <option value="bubble">Bubble Chart</option>
            </optgroup>
            <optgroup label="3D Charts">
              <option value="column3d">3D Column Chart</option>
              <option value="bar3d">3D Bar Chart</option>
            </optgroup>
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="x-axis" className="block text-sm font-medium text-gray-700 mb-1">
            X-Axis Column
          </label>
          <select
            id="x-axis"
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select X-Axis Column</option>
            {columns.map((column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="y-axis" className="block text-sm font-medium text-gray-700 mb-1">
            Y-Axis Column
          </label>
          <select
            id="y-axis"
            value={yAxis}
            onChange={(e) => setYAxis(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Y-Axis Column</option>
            {columns.map((column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>
        </div>
        
        {is3DChart && (
          <div className="mb-4">
            <label htmlFor="z-axis" className="block text-sm font-medium text-gray-700 mb-1">
              Z-Axis Column (for 3D charts)
            </label>
            <select
              id="z-axis"
              value={zAxis}
              onChange={(e) => setZAxis(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required={is3DChart}
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
        
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Generate Chart
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChartCreator;