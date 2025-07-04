import React from 'react';
import { 
  BellIcon,
  UserCircleIcon,
  CogIcon,
} from '@heroicons/react/24/outline';
import { Button, Badge } from '@/components/atoms';
import { useStore } from '@/store/useStore';

const Header: React.FC = () => {
  const { currentPage } = useStore();

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Dashboard Analytics';
      case 'labo':
        return 'Laboratoires';
      default:
        return 'Analytics Pharma';
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/90 border-b border-gray-200/50 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3">
        
        {/* Left section */}
        <div className="flex items-center gap-4 ml-16">
          
          {/* Page Title */}
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                {getPageTitle()}
              </h1>
              <p className="text-xs text-gray-600 hidden sm:block">
                Tableau de bord pharmaceutique
              </p>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-gray-100 relative"
            >
              <BellIcon className="h-5 w-5 text-gray-700" />
              <Badge 
                variant="error" 
                size="sm"
                className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center bg-red-500 text-white"
              >
                3
              </Badge>
            </Button>
          </div>

          {/* Settings */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-100"
          >
            <CogIcon className="h-5 w-5 text-gray-700" />
          </Button>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-300 mx-2"></div>

          {/* User */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-gray-900">Dr. Martin</p>
              <p className="text-xs text-gray-600">Pharmacien titulaire</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <UserCircleIcon className="h-8 w-8 text-gray-700" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;