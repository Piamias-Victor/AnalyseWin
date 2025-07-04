import React from 'react';
import { 
  ChartBarIcon,
  CubeIcon,
  ArrowsRightLeftIcon,
  ChartPieIcon,
  ExclamationTriangleIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import type { TabType, TabConfig } from '@/types';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  disabled?: boolean;
}

const tabs: TabConfig[] = [
  {
    id: 'marge',
    label: 'Marge',
    icon: ChartBarIcon,
  },
  {
    id: 'stock',
    label: 'Stock',
    icon: CubeIcon,
  },
  {
    id: 'comparaison',
    label: 'Comparaison',
    icon: ArrowsRightLeftIcon,
  },
  {
    id: 'analyse',
    label: 'Analyse',
    icon: ChartPieIcon,
  },
  {
    id: 'perimes',
    label: 'Périmés',
    icon: ExclamationTriangleIcon,
  },
  {
    id: 'compensation',
    label: 'Compensation',
    icon: BanknotesIcon,
  },
];

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  disabled = false,
}) => {
  return (
    <div className="border-b border-gray-200 bg-white rounded-t-lg">
      <nav className="flex space-x-8 px-6" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => !disabled && onTabChange(tab.id)}
              disabled={disabled}
              className={cn(
                'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200',
                {
                  'border-gray-900 text-gray-900': isActive && !disabled,
                  'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': 
                    !isActive && !disabled,
                  'border-transparent text-gray-300 cursor-not-allowed': disabled,
                }
              )}
            >
              <Icon 
                className={cn(
                  'h-5 w-5 mr-2 transition-colors duration-200',
                  {
                    'text-gray-900': isActive && !disabled,
                    'text-gray-400 group-hover:text-gray-500': !isActive && !disabled,
                    'text-gray-300': disabled,
                  }
                )} 
              />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default TabNavigation;