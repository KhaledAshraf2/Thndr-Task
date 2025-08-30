import React from 'react';
import { useInfiniteTickers } from '@/hooks/useInfiniteTickers';
import { useStockDialog } from '@/hooks/useStockDialog';
import { StockList } from '@/components/StockList';
import { StockDetailsDialog } from '@/components/StockDetailsDialog';
import { EmptyState } from '@/components/LoadingStates';

export const StocksPage: React.FC = () => {
  const { tickers, hasMore, isLoading, loadMore } = useInfiniteTickers();
  const { selectedTicker, isOpen, openDialog, closeDialog } = useStockDialog();

  if (tickers.length === 0 && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          NASDAQ Stock Explorer
        </h1>
        <EmptyState />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          NASDAQ Stock Explorer
        </h1>

        <StockList
          tickers={tickers}
          hasMore={hasMore}
          loading={isLoading}
          onLoadMore={loadMore}
          onTickerClick={openDialog}
        />
      </div>

      <StockDetailsDialog
        ticker={selectedTicker}
        isOpen={isOpen}
        onClose={closeDialog}
      />
    </>
  );
};
