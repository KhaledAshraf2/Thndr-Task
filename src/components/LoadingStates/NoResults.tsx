import React from 'react';
import { SearchIcon, StocksIcon } from '@/components/Icons';

interface NoResultsProps {
  searchQuery?: string;
}

export const NoResults: React.FC<NoResultsProps> = ({ searchQuery }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6">
        {searchQuery ? (
          <SearchIcon className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
        ) : (
          <StocksIcon className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
        )}
      </div>
      <h3 className="text-lg md:text-xl font-medium text-white mb-2">
        {searchQuery ? `No results for "${searchQuery}"` : 'No stocks found'}
      </h3>
      <p className="text-sm md:text-base text-gray-400 max-w-md">
        {searchQuery
          ? 'Try searching for a different query.'
          : 'Check back later for new listings.'}
      </p>
    </div>
  );
};
