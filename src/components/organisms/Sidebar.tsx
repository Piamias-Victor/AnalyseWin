import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  BeakerIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  BeakerIcon as BeakerIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
} from '@heroicons/react/24/solid';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  iconActive: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
    iconActive: HomeIconSolid,
  },
  {
    id: 'labo',
    label: 'Laboratoires',
    href: '/labo',
    icon: BeakerIcon,
    iconActive: BeakerIconSolid,
    badge: 'NEW',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/analytics',
    icon: ChartBarIcon,
    iconActive: ChartBarIconSolid,
  },
  {
    id: 'reports',
    label: 'Rapports',
    href: '/reports',
    icon: DocumentTextIcon,
    iconActive: DocumentTextIconSolid,
  },
];

const bottomNavItems: NavItem[] = [
  {
    id: 'settings',
    label: 'Paramètres',
    href: '/settings',
    icon: CogIcon,
    iconActive: CogIcon,
  },
  {
    id: 'help',
    label: 'Aide',
    href: '/help',
    icon: QuestionMarkCircleIcon,
    iconActive: QuestionMarkCircleIcon,
  },
];

const Sidebar: React.FC = () => {
  const { setCurrentPage } = useStore();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const NavButton: React.FC<{ item: NavItem }> = ({ item }) => {
    const isActive = pathname === item.href;
    const Icon = isActive ? item.iconActive : item.icon;

    return (
      <Link
        href={item.href}
        onClick={() => setCurrentPage(item.id)}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300',
          'hover:bg-gray-100 group relative',
          {
            'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg': isActive,
            'text-gray-700 hover:text-gray-900': !isActive,
          }
        )}
      >
        <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
          <Icon className={cn(
            'h-5 w-5 transition-colors duration-300',
            isActive ? 'text-white' : 'text-gray-600'
          )} />
        </div>
        
        <div className={cn(
          'flex items-center justify-between flex-1 transition-all duration-300 overflow-hidden',
          isExpanded ? 'opacity-100 translate-x-0 w-auto' : 'opacity-0 translate-x-2 w-0'
        )}>
          <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>
          {item.badge && (
            <span className="px-1.5 py-0.5 text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex-shrink-0 ml-2">
              {item.badge}
            </span>
          )}
        </div>

        {/* Tooltip pour sidebar collapsed */}
        {!isExpanded && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
            {item.label}
          </div>
        )}
      </Link>
    );
  };

  return (
    <aside 
      className={cn(
        'fixed left-0 top-0 h-screen backdrop-blur-xl bg-white/90 border-r border-gray-200/50 shadow-2xl z-50 transition-all duration-300 ease-in-out',
        isExpanded ? 'w-64' : 'w-16'
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col h-full">
        
        {/* Logo */}
        <div className="h-16 flex items-center px-3 border-b border-gray-200/50">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold">AP</span>
          </div>
          <div className={cn(
            'ml-3 transition-all duration-300',
            isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          )}>
            <h1 className="text-sm font-bold text-gray-900 whitespace-nowrap">Analytics Pharma</h1>
          </div>
        </div>

        {/* Navigation principale */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <NavButton key={item.id} item={item} />
          ))}
        </nav>

        {/* Divider */}
        <div className="border-t border-gray-200/50 mx-3"></div>

        {/* Navigation secondaire */}
        <nav className="p-3 space-y-1">
          {bottomNavItems.map((item) => (
            <NavButton key={item.id} item={item} />
          ))}
        </nav>

        {/* Footer */}
        <div className={cn(
          'p-3 border-t border-gray-200/50 transition-all duration-300',
          isExpanded ? 'opacity-100' : 'opacity-0'
        )}>
          <p className="text-xs text-gray-500 text-center whitespace-nowrap">
            Analytics Pharma v1.0
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;