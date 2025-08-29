import { useState, useCallback } from 'react';
import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { API_KEY, API_BASE_URL } from '@/constants';
import type { Ticker, TickersResponse, UseTickersReturn } from '@/types/ticker';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

const TICKERS_PAGE_SIZE = 50;
const DEBOUNCE_DELAY_MS = 400;
const MARKET_TYPE = 'stocks' as const;
const ACTIVE_STOCKS_ONLY = true as const;

const fetchTickers = async (
  search: string,
  signal: AbortSignal,
  cursor?: string,
): Promise<TickersResponse> => {
  const url = new URL(`${API_BASE_URL}/v3/reference/tickers`);
  url.searchParams.set('apiKey', API_KEY);
  url.searchParams.set('limit', String(TICKERS_PAGE_SIZE));
  url.searchParams.set('active', String(ACTIVE_STOCKS_ONLY));
  url.searchParams.set('market', MARKET_TYPE);
  if (search) url.searchParams.set('search', search);
  if (cursor) url.searchParams.set('cursor', cursor);

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    signal: signal ?? null,
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again in a moment.');
    }
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`,
    );
  }

  const data = (await response.json()) as TickersResponse;
  return data;
};

export const useInfiniteTickers = (): UseTickersReturn => {
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebouncedValue(search, DEBOUNCE_DELAY_MS);

  // React Query: infinite query for cursor-based pagination
  const {
    data,
    error: queryError,
    isFetching,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch: rqRefetch,
  } = useInfiniteQuery<
    TickersResponse,
    Error,
    InfiniteData<TickersResponse>,
    ['tickers', string],
    string | undefined
  >({
    queryKey: ['tickers', debouncedSearch],
    queryFn: async ({ pageParam, signal }) =>
      fetchTickers(debouncedSearch, signal, pageParam),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next_url) return undefined;
      const cursor = new URL(lastPage.next_url).searchParams.get('cursor');
      return cursor ?? undefined;
    },
    initialPageParam: undefined,
  });

  // Derive UI values directly from query data
  const pages = data?.pages ?? [];
  const tickers: Ticker[] = pages.flatMap((p) => p.results);
  const lastPage = data?.pages?.[data.pages.length - 1];
  const hasMore = Boolean(lastPage?.next_url);
  const loading = isLoading || isFetching;
  const error = queryError instanceof Error ? queryError.message : null;

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      void fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  const refetch = useCallback(() => {
    void rqRefetch();
  }, [rqRefetch]);

  return {
    tickers,
    loading,
    isInitialLoading: isLoading,
    isFetching,
    error,
    hasMore,
    loadMore,
    refetch,
    search,
    setSearch,
  };
};
