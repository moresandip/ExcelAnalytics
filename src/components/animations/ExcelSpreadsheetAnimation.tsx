import React, { useState, useEffect } from 'react';

interface ExcelSpreadsheetAnimationProps {
  className?: string;
  cellCount?: number;
  animationSpeed?: number;
}

const ExcelSpreadsheetAnimation: React.FC<ExcelSpreadsheetAnimationProps> = ({
  className = '',
  cellCount = 20,
  animationSpeed = 150
}) => {
  const [activeCells, setActiveCells] = useState<Set<number>>(new Set());
  const [filledCells, setFilledCells] = useState<Set<number>>(new Set());

  useEffect(() => {
    let currentCell = 0;
    const interval = setInterval(() => {
      if (currentCell < cellCount) {
        setActiveCells(new Set([currentCell]));
        
        setTimeout(() => {
          setFilledCells(prev => new Set([...prev, currentCell]));
          setActiveCells(new Set());
        }, animationSpeed / 2);
        
        currentCell++;
      } else {
        // Reset animation
        setTimeout(() => {
          setFilledCells(new Set());
          currentCell = 0;
        }, 2000);
      }
    }, animationSpeed);

    return () => clearInterval(interval);
  }, [cellCount, animationSpeed]);

  const getCellValue = (index: number) => {
    const values = ['Sales', '1250', 'Revenue', '3400', 'Profit', '890', 'Growth', '15%'];
    return values[index % values.length];
  };

  return (
    <div className={`relative ${className}`}>
      <div className="grid grid-cols-4 gap-1 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
        {/* Header row */}
        <div className="col-span-4 grid grid-cols-4 gap-1 mb-2">
          {['A', 'B', 'C', 'D'].map((header, index) => (
            <div
              key={header}
              className="h-8 bg-gray-100 border border-gray-300 flex items-center justify-center text-xs font-semibold text-gray-600 rounded"
            >
              {header}
            </div>
          ))}
        </div>

        {/* Data cells */}
        {[...Array(cellCount)].map((_, index) => {
          const isActive = activeCells.has(index);
          const isFilled = filledCells.has(index);
          
          return (
            <div
              key={index}
              className={`
                h-8 border border-gray-300 flex items-center justify-center text-xs font-medium rounded
                transition-all duration-300 transform
                ${isActive 
                  ? 'bg-blue-100 border-blue-400 scale-105 shadow-md animate-pulse' 
                  : isFilled 
                    ? 'bg-green-50 border-green-300 text-green-700' 
                    : 'bg-white hover:bg-gray-50'
                }
              `}
            >
              {isFilled && (
                <span className="animate-fade-in">
                  {getCellValue(index)}
                </span>
              )}
              
              {/* Typing cursor effect */}
              {isActive && (
                <div className="w-px h-4 bg-blue-500 animate-pulse ml-1" />
              )}
            </div>
          );
        })}
      </div>

      {/* Excel-style formula bar */}
      <div className="mt-4 bg-gray-50 border border-gray-300 rounded p-2">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-gray-600">fx</span>
          <div className="flex-1 bg-white border border-gray-300 rounded px-2 py-1">
            <span className="text-xs text-gray-700 font-mono">
              =SUM(A1:D{Math.floor(cellCount/4)})
            </span>
          </div>
        </div>
      </div>

      {/* Floating Excel icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-500 opacity-20 animate-float-slow"
            style={{
              left: `${10 + i * 15}%`,
              top: `${10 + Math.sin(i * 2) * 20}%`,
              animationDelay: `${i * 500}ms`,
              fontSize: '1.5rem'
            }}
          >
            📊
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExcelSpreadsheetAnimation;