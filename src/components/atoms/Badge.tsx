import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className,
  ...props
}) => {
  const badgeClasses = cn(
    'inline-flex items-center gap-1.5 rounded-full font-medium',
    'transition-all duration-200 ease-in-out',
    {
      // Variants
      'bg-gray-100 text-gray-800': variant === 'default',
      'bg-green-100 text-green-800': variant === 'success',
      'bg-yellow-100 text-yellow-800': variant === 'warning',
      'bg-red-100 text-red-800': variant === 'error',
      'bg-blue-100 text-blue-800': variant === 'info',
      'backdrop-blur-md bg-white/20 border border-white/30 text-white': 
        variant === 'glass',
      
      // Sizes
      'px-2 py-0.5 text-xs': size === 'sm',
      'px-2.5 py-1 text-sm': size === 'md',
      'px-3 py-1.5 text-base': size === 'lg',
    }
  );

  const dotClasses = cn(
    'h-2 w-2 rounded-full',
    {
      'bg-gray-600': variant === 'default',
      'bg-green-600': variant === 'success',
      'bg-yellow-600': variant === 'warning',
      'bg-red-600': variant === 'error',
      'bg-blue-600': variant === 'info',
      'bg-white': variant === 'glass',
    }
  );

  return (
    <span className={cn(badgeClasses, className)} {...props}>
      {dot && <span className={dotClasses} />}
      {children}
    </span>
  );
};

export default Badge;