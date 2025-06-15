import React, { useState, useEffect } from 'react';
import { BarChart3, LineChart, PieChart, TrendingUp } from 'lucide-react';

interface ChartMorphingProps {
  size?: 'sm' | 'md' | 'lg';
  speed?: number;
  className?: string;
}

const ChartMorphing: React.FC<ChartMorphingProps> = ({ 
  size = 'md', 
  speed = 2000,
  className = '' 
}) => {
  const [currentChart, setCurrentChart] = useState(0);
  
  const charts = [
    { icon: BarChart3, color: 'text-blue-500', name: 'Bar Chart' },
    { icon: LineChart, color: 'text-green-500', name: 'Line Chart' },
    { icon: PieChart, color: 'text-purple-500', name: 'Pie Chart' },
    { icon: TrendingUp, color: 'text-orange-500', name: 'Trend Chart' }
  ];

  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentChart(prev => (prev + 1) % charts.length);
    }, speed);

    return () => clearInterval(interval);
  }, [speed]);

  const CurrentIcon = charts[currentChart].icon;

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {/* Background glow */}
        <div className={`absolute inset-0 ${sizes[size]} rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 animate-pulse`} />
        
        {/* Main icon */}
        <div className={`relative ${sizes[size]} flex items-center justify-center`}>
          <CurrentIcon 
            className={`${sizes[size]} ${charts[currentChart].color} transition-all duration-500 transform animate-bounce-gentle`}
          />
        </div>
        
        {/* Morphing particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping`}
              style={{
                top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 30}%`,
                left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 30}%`,
                animationDelay: `${i * 200}ms`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Chart type label */}
      <div className="mt-2 text-center">
        <span className="text-xs font-medium text-gray-600 opacity-75">
          {charts[currentChart].name}
        </span>
      </div>
    </div>
  );
};

export default ChartMorphing;