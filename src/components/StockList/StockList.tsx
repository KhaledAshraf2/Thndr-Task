import React, { useRef, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { StockCard } from '@/components/StockCard';
import { SkeletonCard, EmptyState } from '@/components/LoadingStates';
import type { StockListProps } from '@/types/components';

const ITEM_HEIGHT = {
  MOBILE: 76,
  DESKTOP: 92,
};

export const StockList: React.FC<StockListProps> = ({
  tickers,
  hasMore,
  loading,
  onLoadMore,
  onTickerClick,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const totalItems = tickers.length + (hasMore && loading ? 3 : 0);

  const virtualizer = useVirtualizer({
    count: totalItems,
    getScrollElement: () => parentRef.current,
    estimateSize: () =>
      window.innerWidth >= 768 ? ITEM_HEIGHT.DESKTOP : ITEM_HEIGHT.MOBILE,
    overscan: 5,
  });

  useEffect(() => {
    const scrollElement = parentRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

      if (scrollPercentage > 0.9 && hasMore && !loading) {
        onLoadMore();
      }
    };

    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading, onLoadMore]);

  if (tickers.length === 0 && !loading) {
    return <EmptyState />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        ref={parentRef}
        className="h-[calc(100vh-200px)] overflow-auto contain-strict">
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}>
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const isLoadingItem = virtualItem.index >= tickers.length;

            return (
              <div
                key={
                  isLoadingItem
                    ? `skeleton-${virtualItem.index}`
                    : virtualItem.key
                }
                className="absolute top-0 left-0 w-full px-4 md:px-6 pb-[16px]"
                style={{
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}>
                {isLoadingItem ? (
                  <SkeletonCard />
                ) : (
                  <StockCard
                    ticker={tickers[virtualItem.index]!}
                    {...(onTickerClick && { onClick: onTickerClick })}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
