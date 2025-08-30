import React from 'react';
import type { Ticker } from '@/types/ticker';

interface StockDetailsDialogProps {
  ticker: Ticker | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StockDetailsDialog: React.FC<StockDetailsDialogProps> = ({
  ticker,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !ticker) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-hidden"
      onClick={onClose}>
      <div
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Stock Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Ticker Symbol
              </label>
              <p className="text-lg font-semibold text-white">
                {ticker.ticker}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Company Name
              </label>
              <p className="text-white">{ticker.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Market
                </label>
                <p className="text-white">{ticker.market}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Currency
                </label>
                <p className="text-white">{ticker.currency_name}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Primary Exchange
              </label>
              <p className="text-white">{ticker.primary_exchange}</p>
            </div>

            {ticker.type && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Type
                </label>
                <p className="text-white">{ticker.type}</p>
              </div>
            )}

            {ticker.active !== undefined && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Status
                </label>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    ticker.active
                      ? 'bg-green-900 text-green-200'
                      : 'bg-red-900 text-red-200'
                  }`}>
                  {ticker.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 cursor-pointer bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
