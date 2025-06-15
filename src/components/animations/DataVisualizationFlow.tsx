import React, { useEffect, useRef, useState } from 'react';

interface DataVisualizationFlowProps {
  data?: number[];
  className?: string;
  animated?: boolean;
}

const DataVisualizationFlow: React.FC<DataVisualizationFlowProps> = ({ 
  data = [20, 45, 30, 60, 35, 50, 40],
  className = '',
  animated = true
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [animatedData, setAnimatedData] = useState<number[]>(new Array(data.length).fill(0));

  useEffect(() => {
    if (!animated) {
      setAnimatedData(data);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const animate = () => {
      if (currentStep <= steps) {
        const progress = currentStep / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setAnimatedData(data.map(value => value * easeOutQuart));
        currentStep++;
        setTimeout(animate, stepDuration);
      }
    };

    animate();
  }, [data, animated]);

  const maxValue = Math.max(...data);
  const width = 300;
  const height = 150;
  const barWidth = width / data.length - 10;

  return (
    <div className={`relative ${className}`}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="overflow-visible"
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.9" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Animated grid lines */}
        {[...Array(5)].map((_, i) => (
          <line
            key={i}
            x1="0"
            y1={height - (i * height / 4)}
            x2={width}
            y2={height - (i * height / 4)}
            stroke="#E5E7EB"
            strokeWidth="1"
            opacity="0.5"
            className="animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}

        {/* Animated bars */}
        {animatedData.map((value, index) => {
          const barHeight = (value / maxValue) * (height - 20);
          const x = index * (barWidth + 10) + 5;
          const y = height - barHeight - 10;

          return (
            <g key={index}>
              {/* Bar shadow */}
              <rect
                x={x + 2}
                y={y + 2}
                width={barWidth}
                height={barHeight}
                fill="rgba(0,0,0,0.1)"
                rx="4"
              />
              
              {/* Main bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="url(#barGradient)"
                filter="url(#glow)"
                rx="4"
                className="transition-all duration-300 hover:opacity-80"
              >
                <animate
                  attributeName="height"
                  values={`0;${barHeight}`}
                  dur="1.5s"
                  begin={`${index * 0.1}s`}
                  fill="freeze"
                />
                <animate
                  attributeName="y"
                  values={`${height - 10};${y}`}
                  dur="1.5s"
                  begin={`${index * 0.1}s`}
                  fill="freeze"
                />
              </rect>

              {/* Value label */}
              <text
                x={x + barWidth / 2}
                y={y - 5}
                textAnchor="middle"
                className="text-xs font-medium fill-gray-600"
                opacity="0"
              >
                {Math.round(value)}
                <animate
                  attributeName="opacity"
                  values="0;1"
                  dur="0.5s"
                  begin={`${1.5 + index * 0.1}s`}
                  fill="freeze"
                />
              </text>

              {/* Floating particles */}
              <circle
                cx={x + barWidth / 2}
                cy={y}
                r="2"
                fill="#3B82F6"
                opacity="0.6"
              >
                <animate
                  attributeName="cy"
                  values={`${y};${y - 20};${y}`}
                  dur="3s"
                  repeatCount="indefinite"
                  begin={`${index * 0.2}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0;0.6"
                  dur="3s"
                  repeatCount="indefinite"
                  begin={`${index * 0.2}s`}
                />
              </circle>
            </g>
          );
        })}

        {/* Animated trend line */}
        <path
          d={`M ${animatedData.map((value, index) => {
            const x = index * (barWidth + 10) + 5 + barWidth / 2;
            const y = height - (value / maxValue) * (height - 20) - 10;
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
          }).join(' ')}`}
          stroke="#10B981"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
          filter="url(#glow)"
          strokeDasharray="5,5"
          className="animate-pulse"
        />
      </svg>

      {/* Floating data points */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full animate-float-slow opacity-60"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + Math.sin(i) * 30}%`,
              animationDelay: `${i * 300}ms`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DataVisualizationFlow;