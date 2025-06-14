import React, { useState } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface GlowingButtonProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

const GlowingButton: React.FC<GlowingButtonProps> = ({
  children,
  icon: Icon,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    primary: 'from-blue-600 to-purple-600 shadow-blue-500/25',
    secondary: 'from-gray-600 to-gray-700 shadow-gray-500/25',
    success: 'from-green-600 to-emerald-600 shadow-green-500/25',
    warning: 'from-orange-600 to-red-600 shadow-orange-500/25'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative inline-flex items-center justify-center font-medium text-white
        bg-gradient-to-r ${variants[variant]}
        rounded-xl shadow-lg transition-all duration-300 ease-out
        transform hover:scale-105 hover:shadow-xl
        ${isHovered ? 'shadow-2xl' : ''}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      style={{
        boxShadow: isHovered 
          ? `0 20px 40px -12px ${variant === 'primary' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(0, 0, 0, 0.3)'}`
          : undefined
      }}
    >
      {/* Glow effect */}
      <div 
        className={`
          absolute inset-0 rounded-xl bg-gradient-to-r ${variants[variant]}
          opacity-0 transition-opacity duration-300
          ${isHovered ? 'opacity-20' : ''}
        `}
        style={{
          filter: 'blur(8px)',
          transform: 'scale(1.1)'
        }}
      />
      
      {/* Content */}
      <div className="relative flex items-center space-x-2">
        {Icon && <Icon className="h-5 w-5" />}
        <span>{children}</span>
      </div>
      
      {/* Shine effect */}
      <div 
        className={`
          absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent
          transform -skew-x-12 transition-transform duration-700
          ${isHovered ? 'translate-x-full' : '-translate-x-full'}
        `}
      />
    </button>
  );
};

export default GlowingButton;