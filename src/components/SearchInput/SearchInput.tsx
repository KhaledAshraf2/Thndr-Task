import React from 'react';
import { SearchIcon, SpinnerIcon, CloseIcon } from '@/components/Icons';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  isSearching?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search stocks...',
  className = '',
  disabled = false,
  isSearching = false,
}) => {
  return (
    <div
      className={`flex items-center bg-gray-800 border border-gray-600 rounded-lg transition-all duration-200 hover:border-gray-500 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-400/20 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}>
      <div className="flex items-center pl-3 pointer-events-none">
        {isSearching ? (
          <SpinnerIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-400 animate-spin" />
        ) : (
          <SearchIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-400 transition-colors" />
        )}
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 px-3 py-2.5 md:py-3 text-sm md:text-base bg-transparent text-white placeholder-gray-400 focus:outline-none disabled:cursor-not-allowed"
      />

      {value.length > 0 && !disabled && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 mr-3 text-gray-400 hover:text-gray-300 transition-colors rounded-full hover:bg-gray-700"
          aria-label="Clear search">
          <CloseIcon className="w-3 h-3 md:w-4 md:h-4 cursor-pointer" />
        </button>
      )}
    </div>
  );
};
