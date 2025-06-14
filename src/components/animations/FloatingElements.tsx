import React from 'react';

const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full animate-float-slow"></div>
      <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full animate-float-medium"></div>
      <div className="absolute top-1/2 left-3/4 w-32 h-32 bg-gradient-to-r from-green-400/10 to-teal-400/10 rounded-full animate-float-fast"></div>
      
      {/* Floating dots */}
      <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-blue-500/20 rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-purple-500/20 rounded-full animate-pulse-medium"></div>
      <div className="absolute top-2/3 right-2/3 w-3 h-3 bg-pink-500/20 rounded-full animate-pulse-fast"></div>
    </div>
  );
};

export default FloatingElements;