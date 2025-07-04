import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  className,
  disabled,
  ...props
}) => {
  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
    'transition-all duration-300 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    {
      // Variants
      'bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 focus:ring-gray-400': 
        variant === 'primary',
      'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300': 
        variant === 'secondary',
      'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300': 
        variant === 'ghost',
      'backdrop-blur-xl bg-white/20 border border-gray-300/50 text-gray-900 hover:bg-white/40 focus:ring-gray-400': 
        variant === 'glass',
      
      // Sizes
      'px-3 py-1.5 text-sm': size === 'sm',
      'px-4 py-2 text-base': size === 'md',
      'px-6 py-3 text-lg': size === 'lg',
    }
  );

  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(baseClasses, className)}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
      )}
      
      {icon && iconPosition === 'left' && !loading && icon}
      
      {children}
      
      {icon && iconPosition === 'right' && !loading && icon}
    </button>
  );
};

export default Button;