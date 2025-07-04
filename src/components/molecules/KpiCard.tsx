import React from 'react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  MinusIcon 
} from '@heroicons/react/24/outline';
import { Card, Badge } from '@/components/atoms';
import { cn, formatEur, formatNumber } from '@/lib/utils';
import type { KpiCardProps } from '@/types';

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  loading = false,
}) => {
  const formatValue = (val: string | number): string => {
    if (typeof val === 'number') {
      if (title.toLowerCase().includes('ca') || title.toLowerCase().includes('marge') || title.toLowerCase().includes('stock')) {
        return formatEur(val);
      }
      return formatNumber(val);
    }
    return val;
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'increase':
        return <ArrowUpIcon className="h-3 w-3" />;
      case 'decrease':
        return <ArrowDownIcon className="h-3 w-3" />;
      default:
        return <MinusIcon className="h-3 w-3" />;
    }
  };

  const getChangeVariant = () => {
    switch (changeType) {
      case 'increase':
        return 'success';
      case 'decrease':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Card variant="glass" padding="md" className="animate-pulse">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
          <div className="h-8 w-8 bg-gray-300 rounded-lg"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      variant="glass" 
      padding="md" 
      hover={true}
      className="relative overflow-hidden group"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-3 flex-1">
          {/* Title */}
          <h3 className="text-sm font-medium text-gray-700 leading-tight">
            {title}
          </h3>
          
          {/* Value */}
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">
              {formatValue(value)}
            </p>
            
            {/* Change indicator */}
            {change !== undefined && (
              <div className="flex items-center gap-1">
                <Badge 
                  variant={getChangeVariant()} 
                  size="sm"
                  className={cn(
                    'backdrop-blur-sm',
                    changeType === 'increase' && 'bg-green-100 text-green-700 border-green-200',
                    changeType === 'decrease' && 'bg-red-100 text-red-700 border-red-200',
                    changeType === 'neutral' && 'bg-gray-100 text-gray-700 border-gray-200'
                  )}
                >
                  {getChangeIcon()}
                  {Math.abs(change)}%
                </Badge>
                <span className="text-xs text-gray-600">
                  vs période précédente
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Icon */}
        {Icon && (
          <div className="flex-shrink-0">
            <div className="p-2 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg">
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default KpiCard;