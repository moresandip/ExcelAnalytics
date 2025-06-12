import React, { useState, useEffect, useRef } from 'react';
import { Globe, Map, Layers, RotateCcw, Play, Pause, Settings, Download, Zap } from 'lucide-react';

interface PowerMapVisualizationProps {
  data: any[];
  locationColumn: string;
  valueColumn: string;
  timeColumn?: string;
  onExport?: () => void;
}

const PowerMapVisualization: React.FC<PowerMapVisualizationProps> = ({
  data,
  locationColumn,
  valueColumn,
  timeColumn,
  onExport
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [mapType, setMapType] = useState<'globe' | 'flat'>('globe');
  const [visualizationType, setVisualizationType] = useState<'bars' | 'heatmap' | 'bubbles'>('bars');
  const [animationSpeed, setAnimationSpeed] = useState(1000);
  const [showSettings, setShowSettings] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Mock geographic coordinates for demonstration
  const getCoordinates = (location: string) => {
    const coords: { [key: string]: [number, number] } = {
      'North': [45, -100],
      'South': [30, -90],
      'East': [40, -75],
      'West': [35, -120],
      'New York': [40.7128, -74.0060],
      'California': [36.7783, -119.4179],
      'Texas': [31.9686, -99.9018],
      'Florida': [27.7663, -82.6404],
      'London': [51.5074, -0.1278],
      'Paris': [48.8566, 2.3522],
      'Tokyo': [35.6762, 139.6503],
      'Sydney': [-33.8688, 151.2093]
    };
    return coords[location] || [0, 0];
  };

  const processedData = data.map((item, index) => {
    const [lat, lng] = getCoordinates(item[locationColumn]);
    return {
      id: index,
      location: item[locationColumn],
      value: Number(item[valueColumn]) || 0,
      time: timeColumn ? item[timeColumn] : null,
      lat,
      lng,
      color: `hsl(${(Number(item[valueColumn]) || 0) % 360}, 70%, 50%)`
    };
  });

  const uniqueTimes = timeColumn 
    ? [...new Set(data.map(item => item[timeColumn]))].sort()
    : [];

  const currentData = timeColumn 
    ? processedData.filter(item => item.time === uniqueTimes[currentTime])
    : processedData;

  useEffect(() => {
    if (isPlaying && timeColumn && uniqueTimes.length > 0) {
      const interval = setInterval(() => {
        setCurrentTime(prev => (prev + 1) % uniqueTimes.length);
      }, animationSpeed);
      return () => clearInterval(interval);
    }
  }, [isPlaying, animationSpeed, uniqueTimes.length, timeColumn]);

  const togglePlayback = () => {
    if (timeColumn) {
      setIsPlaying(!isPlaying);
    }
  };

  const resetAnimation = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const maxValue = Math.max(...processedData.map(d => d.value));

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Globe className="h-6 w-6 mr-2 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">🌍 Power Map Visualization</h3>
            <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              Geographic 3D
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {timeColumn && (
              <>
                <button
                  onClick={togglePlayback}
                  className={`inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md transition-colors ${
                    isPlaying 
                      ? 'text-red-600 bg-red-100 hover:bg-red-200' 
                      : 'text-green-600 bg-green-100 hover:bg-green-200'
                  }`}
                >
                  {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                
                <button
                  onClick={resetAnimation}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-orange-600 bg-orange-100 hover:bg-orange-200 transition-colors"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset
                </button>
              </>
            )}
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-purple-600 bg-purple-100 hover:bg-purple-200 transition-colors"
            >
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </button>
            
            <button
              onClick={onExport}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Power Map Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Map Type</label>
                <select
                  value={mapType}
                  onChange={(e) => setMapType(e.target.value as 'globe' | 'flat')}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="globe">3D Globe</option>
                  <option value="flat">Flat Map</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Visualization</label>
                <select
                  value={visualizationType}
                  onChange={(e) => setVisualizationType(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="bars">3D Bar Charts</option>
                  <option value="heatmap">Heat Map</option>
                  <option value="bubbles">Bubble Chart</option>
                </select>
              </div>
              {timeColumn && (
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
              )}
            </div>
          </div>
        )}

        {/* Time Controls */}
        {timeColumn && uniqueTimes.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Time Period</span>
              <span className="text-sm text-gray-600">
                {currentTime + 1} of {uniqueTimes.length}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max={uniqueTimes.length - 1}
                value={currentTime}
                onChange={(e) => setCurrentTime(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-medium text-blue-600 min-w-0">
                {uniqueTimes[currentTime]}
              </span>
            </div>
          </div>
        )}

        {/* Map Visualization */}
        <div 
          ref={mapRef}
          className={`relative aspect-video bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg overflow-hidden ${
            mapType === 'globe' ? 'perspective-1000' : ''
          }`}
          style={{
            background: mapType === 'globe' 
              ? 'radial-gradient(circle at center, #1e40af 0%, #1e3a8a 50%, #1e293b 100%)'
              : 'linear-gradient(to bottom, #dbeafe 0%, #bfdbfe 100%)'
          }}
        >
          {/* Globe/Map Container */}
          <div 
            className={`w-full h-full relative ${
              mapType === 'globe' ? 'transform-gpu' : ''
            }`}
            style={{
              transform: mapType === 'globe' 
                ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` 
                : 'none',
              transformStyle: mapType === 'globe' ? 'preserve-3d' : 'flat'
            }}
          >
            {/* World Map Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`relative ${
                mapType === 'globe' ? 'w-80 h-80 rounded-full' : 'w-full h-full'
              } bg-gradient-to-br from-green-200 to-green-400 shadow-2xl`}>
                
                {/* Data Points */}
                {currentData.map((point, index) => {
                  const size = visualizationType === 'bubbles' 
                    ? Math.max(10, (point.value / maxValue) * 50)
                    : visualizationType === 'bars'
                    ? Math.max(5, (point.value / maxValue) * 40)
                    : 8;
                  
                  const opacity = visualizationType === 'heatmap'
                    ? Math.max(0.3, point.value / maxValue)
                    : 1;

                  // Convert lat/lng to screen coordinates (simplified)
                  const x = mapType === 'globe' 
                    ? 50 + (point.lng / 180) * 30 
                    : 50 + (point.lng / 180) * 40;
                  const y = mapType === 'globe'
                    ? 50 - (point.lat / 90) * 30
                    : 50 - (point.lat / 90) * 40;

                  return (
                    <div
                      key={`${point.id}-${currentTime}`}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                        visualizationType === 'bars' ? 'animate-bounce' : 'animate-pulse'
                      }`}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        width: `${size}px`,
                        height: visualizationType === 'bars' ? `${size * 2}px` : `${size}px`,
                        backgroundColor: point.color,
                        opacity,
                        borderRadius: visualizationType === 'bubbles' ? '50%' : '4px',
                        boxShadow: `0 0 ${size/2}px ${point.color}`,
                        zIndex: Math.floor(point.value)
                      }}
                      title={`${point.location}: ${point.value}`}
                    >
                      {/* 3D Bar Effect */}
                      {visualizationType === 'bars' && (
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-800 to-transparent rounded-b"
                          style={{ height: '20%' }}
                        />
                      )}
                      
                      {/* Value Label */}
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white bg-black bg-opacity-50 px-1 rounded whitespace-nowrap">
                        {point.value}
                      </div>
                    </div>
                  );
                })}

                {/* Globe Grid Lines */}
                {mapType === 'globe' && (
                  <div className="absolute inset-0 rounded-full border-2 border-blue-300 opacity-30">
                    <div className="absolute inset-0 rounded-full border border-blue-200 opacity-50" style={{ margin: '10%' }} />
                    <div className="absolute inset-0 rounded-full border border-blue-200 opacity-50" style={{ margin: '20%' }} />
                    <div className="absolute inset-0 rounded-full border border-blue-200 opacity-50" style={{ margin: '30%' }} />
                  </div>
                )}
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg p-3 shadow-lg">
              <h4 className="text-xs font-medium text-gray-900 mb-2">Legend</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                  <span>High Values</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                  <span>Medium Values</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span>Low Values</span>
                </div>
              </div>
            </div>

            {/* Current Time Display */}
            {timeColumn && (
              <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded-lg">
                <div className="text-sm font-medium">{uniqueTimes[currentTime]}</div>
                <div className="text-xs opacity-75">
                  {currentData.length} locations
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-blue-600 font-medium">Total Locations</div>
            <div className="text-xl font-bold text-blue-900">{processedData.length}</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-green-600 font-medium">Max Value</div>
            <div className="text-xl font-bold text-green-900">{maxValue.toLocaleString()}</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="text-purple-600 font-medium">Visualization</div>
            <div className="text-lg font-bold text-purple-900 capitalize">{visualizationType}</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <div className="text-orange-600 font-medium">Map Type</div>
            <div className="text-lg font-bold text-orange-900 capitalize">{mapType}</div>
          </div>
        </div>
      </div>

      {/* Feature Info */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-gray-600">
            <span className="flex items-center">
              <Globe className="h-4 w-4 mr-1 text-blue-600" />
              3D Globe View
            </span>
            <span className="flex items-center">
              <Map className="h-4 w-4 mr-1 text-green-600" />
              Geographic Mapping
            </span>
            <span className="flex items-center">
              <Layers className="h-4 w-4 mr-1 text-purple-600" />
              Multi-layer Visualization
            </span>
            {timeColumn && (
              <span className="flex items-center">
                <Play className="h-4 w-4 mr-1 text-orange-600" />
                Time Animation
              </span>
            )}
          </div>
          <div className="flex items-center text-purple-600 font-medium">
            <Zap className="h-4 w-4 mr-1" />
            Power Map Ready
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerMapVisualization;