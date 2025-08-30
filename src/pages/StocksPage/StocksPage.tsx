import React from 'react';
import { useInfiniteTickers } from '@/hooks/useInfiniteTickers';
import { useStockDialog } from '@/hooks/useStockDialog';
import { StockList } from '@/components/StockList';
import { StockDetailsDialog } from '@/components/StockDetailsDialog';
import { NoResults } from '@/components/LoadingStates';
import { SearchInput } from '@/components/SearchInput';

export const StocksPage: React.FC = () => {
  const { tickers, hasMore, isLoading, loadMore, search, setSearch } =
    useInfiniteTickers();
  const { selectedTicker, isOpen, openDialog, closeDialog } = useStockDialog();

  if (tickers.length === 0 && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          NASDAQ Stock Explorer
        </h1>

        <div className="max-w-md mx-auto mb-8">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search NASDAQ stocks..."
            disabled={isLoading}
            isSearching={isLoading && search.length > 0}
          />
        </div>

        <NoResults searchQuery={search} />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          NASDAQ Stock Explorer
        </h1>

        <div className="sticky top-4 z-10 max-w-md mx-auto mb-6">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search NASDAQ stocks..."
            disabled={isLoading}
            isSearching={isLoading && search.length > 0}
          />
        </div>

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
