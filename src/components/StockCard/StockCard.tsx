import React from 'react';
import type { StockCardProps } from '@/types/components';

export const StockCard: React.FC<StockCardProps> = ({ ticker, onClick }) => {
  return (
    <div
      onClick={() => onClick?.(ticker)}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 md:p-6 h-16 md:h-20 cursor-pointer hover:shadow-md hover:border-red-400 dark:hover:border-red-500 hover:scale-[1.01] active:scale-100 active:shadow-sm transition-all duration-200 ease-out">
      <div className="flex items-center justify-between h-full">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 md:gap-3">
            <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white truncate">
              {ticker.ticker}
            </h3>
            <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              {ticker.market}
            </span>
          </div>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 truncate mt-1">
            {ticker.name}
          </p>
        </div>

        <div className="text-right ml-4">
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            {ticker.currency_name}
          </div>
          <div className="text-xs md:text-sm text-gray-400 dark:text-gray-500">
            {ticker.primary_exchange}
          </div>
        </div>
      </div>
    </div>
  );
};
