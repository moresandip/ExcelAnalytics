import React from 'react';

interface PulsingOrbProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'blue' | 'purple' | 'pink' | 'green' | 'orange';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

const PulsingOrb: React.FC<PulsingOrbProps> = ({
  size = 'md',
  color = 'blue',
  intensity = 'medium',
  className = ''
}) => {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  };

  const colors = {
    blue: 'from-blue-400 to-blue-600',
    purple: 'from-purple-400 to-purple-600',
    pink: 'from-pink-400 to-pink-600',
    green: 'from-green-400 to-green-600',
    orange: 'from-orange-400 to-orange-600'
  };

  const intensities = {
    low: 'animate-pulse-slow',
    medium: 'animate-pulse',
    high: 'animate-pulse-fast'
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main orb */}
      <div 
        className={`
          ${sizes[size]} rounded-full bg-gradient-to-br ${colors[color]}
          ${intensities[intensity]} shadow-lg
        `}
      />
      
      {/* Outer glow rings */}
      <div 
        className={`
          absolute inset-0 ${sizes[size]} rounded-full
          bg-gradient-to-br ${colors[color]} opacity-30
          animate-ping
        `}
        style={{ animationDuration: '2s' }}
      />
      
      <div 
        className={`
          absolute inset-0 ${sizes[size]} rounded-full
          bg-gradient-to-br ${colors[color]} opacity-20
          animate-ping
        `}
        style={{ animationDuration: '3s', animationDelay: '0.5s' }}
      />
    </div>
  );
};

export default PulsingOrb;