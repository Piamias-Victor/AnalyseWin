import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'glass';
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  variant = 'default',
  className,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const inputClasses = cn(
    'w-full rounded-lg border px-3 py-2 text-sm',
    'transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    {
      // Variants
      'border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:ring-gray-200 focus:bg-white': 
        variant === 'default',
      'backdrop-blur-xl bg-white/40 border-gray-300/50 text-gray-900 placeholder-gray-600 focus:border-gray-400 focus:ring-gray-200 focus:bg-white/60': 
        variant === 'glass',
      
      // Icons spacing
      'pl-10': leftIcon,
      'pr-10': rightIcon,
      
      // Error state
      'border-red-500 focus:border-red-500 focus:ring-red-200': error,
    }
  );

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className={cn(
            'block text-sm font-medium mb-1',
            'text-gray-700'
          )}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <input
          id={inputId}
          className={cn(inputClasses, className)}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;