import type { Ticker } from './ticker';

export interface StockCardProps {
  ticker: Ticker;
  onClick?: (ticker: Ticker) => void;
}

export interface StockListProps {
  tickers: Ticker[];
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  onTickerClick?: (ticker: Ticker) => void;
}

export interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
}
