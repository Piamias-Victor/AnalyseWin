import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  className,
  ...props
}) => {
  const cardClasses = cn(
    'rounded-xl border transition-all duration-300 ease-in-out',
    {
      // Variants
      'bg-white border-gray-200 shadow-lg': variant === 'default',
      'backdrop-blur-xl bg-white/90 border border-gray-300/60 shadow-2xl': 
        variant === 'glass',
      'bg-white border-gray-100 shadow-xl': variant === 'elevated',
      
      // Padding
      'p-0': padding === 'none',
      'p-3': padding === 'sm',
      'p-6': padding === 'md',
      'p-8': padding === 'lg',
      
      // Hover effects
      'hover:shadow-xl hover:scale-[1.02] cursor-pointer hover:bg-gray-50': 
        hover && variant === 'default',
      'hover:bg-white/95 hover:scale-[1.02] cursor-pointer hover:border-gray-400/70': 
        hover && variant === 'glass',
      'hover:shadow-2xl hover:scale-[1.02] cursor-pointer hover:bg-gray-50': 
        hover && variant === 'elevated',
    }
  );

  return (
    <div className={cn(cardClasses, className)} {...props}>
      {children}
    </div>
  );
};

export default Card;