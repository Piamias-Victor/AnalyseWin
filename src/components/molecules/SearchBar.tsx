import React, { useState, useCallback } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Input, Button } from '@/components/atoms';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  loading?: boolean;
  variant?: 'default' | 'glass';
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Rechercher...',
  value: controlledValue,
  onChange,
  onSearch,
  onClear,
  loading = false,
  variant = 'default',
  className,
}) => {
  const [internalValue, setInternalValue] = useState('');
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const isControlled = controlledValue !== undefined;

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (isControlled) {
      onChange?.(newValue);
    } else {
      setInternalValue(newValue);
    }
  }, [isControlled, onChange]);

  const handleSearch = useCallback(() => {
    if (value.trim()) {
      onSearch?.(value.trim());
    }
  }, [value, onSearch]);

  const handleClear = useCallback(() => {
    if (isControlled) {
      onChange?.('');
    } else {
      setInternalValue('');
    }
    onClear?.();
  }, [isControlled, onChange, onClear]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      handleClear();
    }
  }, [handleSearch, handleClear]);

  const leftIcon = (
    <MagnifyingGlassIcon className={cn(
      'h-4 w-4',
      variant === 'glass' ? 'text-white/70' : 'text-gray-400'
    )} />
  );

  const rightIcon = value && (
    <button
      type="button"
      onClick={handleClear}
      className={cn(
        'h-4 w-4 rounded-full transition-colors',
        variant === 'glass' 
          ? 'text-white/70 hover:text-white' 
          : 'text-gray-400 hover:text-gray-600'
      )}
    >
      <XMarkIcon className="h-4 w-4" />
    </button>
  );

  return (
    <div className={cn('flex gap-2', className)}>
      <div className="flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          variant={variant}
          disabled={loading}
        />
      </div>
      
      <Button
        onClick={handleSearch}
        disabled={!value.trim() || loading}
        loading={loading}
        variant={variant === 'glass' ? 'glass' : 'primary'}
        size="md"
      >
        Rechercher
      </Button>
    </div>
  );
};

export default SearchBar;