import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 md:p-6 h-16 md:h-20 animate-pulse">
      <div className="flex items-center justify-between h-full">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="h-4 md:h-5 bg-gray-600 rounded w-16 md:w-20"></div>
            <div className="h-3 md:h-4 bg-gray-700 rounded w-8 md:w-10"></div>
          </div>
          <div className="h-3 md:h-4 bg-gray-700 rounded w-32 md:w-40 mt-1"></div>
        </div>

        <div className="text-right ml-4 space-y-1">
          <div className="h-3 md:h-4 bg-gray-700 rounded w-12 md:w-16"></div>
          <div className="h-3 md:h-4 bg-gray-700 rounded w-10 md:w-14"></div>
        </div>
      </div>
    </div>
  );
};
