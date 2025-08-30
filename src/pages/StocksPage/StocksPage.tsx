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
      <div className="h-full flex flex-col container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          NASDAQ Stock Explorer
        </h1>

        <div className="w-full max-w-xs md:max-w-xl mx-auto mb-8 px-4 md:px-6">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search NASDAQ stocks..."
            isSearching={isLoading && search.length > 0}
          />
        </div>

        <NoResults searchQuery={search} />
      </div>
    );
  }

  return (
    <>
      <div className="h-full flex flex-col container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          NASDAQ Stock Explorer
        </h1>

        <div className="sticky top-4 z-10 w-full max-w-xs md:max-w-xl mx-auto mb-6 px-4 md:px-6">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search NASDAQ stocks..."
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
