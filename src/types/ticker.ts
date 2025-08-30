export interface Ticker {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  primary_exchange: string;
  type: string;
  active: boolean;
  currency_name: string;
  cik?: string;
  composite_figi?: string;
  share_class_figi?: string;
}

export interface TickersResponse {
  results: Ticker[];
  status: string;
  request_id: string;
  count: number;
  next_url?: string;
}

export interface UseTickersReturn {
  tickers: Ticker[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  search: string;
  setSearch: (search: string) => void;
}
