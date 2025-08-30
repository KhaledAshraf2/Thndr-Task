import { useState, useCallback, useEffect } from 'react';
import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { API_KEY, API_BASE_URL } from '@/constants';
import type { Ticker, TickersResponse, UseTickersReturn } from '@/types/ticker';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { showRateLimitToast } from '@/components/Toast/RateLimitToast';
import toast from 'react-hot-toast';

const TICKERS_PAGE_SIZE = 50;
const DEBOUNCE_DELAY_MS = 400;
const MARKET_TYPE = 'stocks' as const;
const ACTIVE_STOCKS_ONLY = true as const;
const RATE_LIMIT_COUNTDOWN_DURATION = 20;

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
    switch (response.status) {
      case 429:
        throw new Error(
          'Rate limit exceeded. Please wait a moment and try again.',
        );
      case 401:
        throw new Error('Invalid API key. Please check your configuration.');
      case 403:
        throw new Error('Access denied. Please check your API permissions.');
      case 500:
        throw new Error('Server error. Please try again later.');
      default:
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}`,
        );
    }
  }

  const data = (await response.json()) as TickersResponse;
  return data;
};

export const useInfiniteTickers = (): UseTickersReturn => {
  const [search, setSearch] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [hasStartedCountdown, setHasStartedCountdown] = useState(false);

  const debouncedSearch = useDebouncedValue(search, DEBOUNCE_DELAY_MS);

  const {
    data,
    error: queryError,
    isFetching,
    fetchNextPage,
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

  const pages = data?.pages ?? [];
  const tickers: Ticker[] = pages.flatMap((p) => p.results);
  const lastPage = data?.pages?.[data.pages.length - 1];
  const hasMore = Boolean(lastPage?.next_url);
  const error = queryError instanceof Error ? queryError.message : null;
  const isRateLimited =
    queryError instanceof Error && queryError.message.includes('Rate limit');

  const loadMore = useCallback(() => {
    if (hasMore && !(isRateLimited && countdown > 0) && !isFetching) {
      void fetchNextPage();
    }
  }, [hasMore, fetchNextPage, isRateLimited, countdown, isFetching]);

  const retryAfterRateLimit = useCallback(() => {
    if (isRateLimited && !isFetching && countdown === 0) {
      setHasStartedCountdown(false);
      void fetchNextPage();
    }
  }, [isRateLimited, fetchNextPage, isFetching, countdown]);

  useEffect(() => {
    if (!queryError) {
      toast.dismiss('rate-limit-toast');
      setHasStartedCountdown(false);
      setCountdown(0);
      return;
    }

    if (isRateLimited) {
      if (!hasStartedCountdown) {
        setCountdown(RATE_LIMIT_COUNTDOWN_DURATION);
        setHasStartedCountdown(true);
      }
      showRateLimitToast(
        'rate-limit-toast',
        countdown,
        retryAfterRateLimit,
        isFetching,
      );
    } else {
      toast.error(queryError.message);
    }
  }, [
    queryError,
    hasStartedCountdown,
    countdown,
    retryAfterRateLimit,
    isFetching,
    isRateLimited,
  ]);

  useEffect(() => {
    if (!isRateLimited || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRateLimited, countdown]);

  useEffect(() => {
    if (!isRateLimited && (countdown > 0 || hasStartedCountdown)) {
      setCountdown(0);
      setHasStartedCountdown(false);
    }
  }, [isRateLimited, countdown, hasStartedCountdown]);

  useEffect(() => {
    return () => {
      toast.dismiss('rate-limit-toast');
    };
  }, []);

  return {
    tickers,
    isLoading: isFetching,
    error,
    hasMore,
    loadMore,
    search,
    setSearch,
  };
};
