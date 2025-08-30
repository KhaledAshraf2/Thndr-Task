import { useState, useCallback } from 'react';
import type { Ticker } from '@/types/ticker';

export const useStockDialog = () => {
  const [selectedTicker, setSelectedTicker] = useState<Ticker | null>(null);

  const openDialog = useCallback((ticker: Ticker) => {
    setSelectedTicker(ticker);
  }, []);

  const closeDialog = useCallback(() => {
    setSelectedTicker(null);
  }, []);

  return {
    selectedTicker,
    isOpen: selectedTicker !== null,
    openDialog,
    closeDialog,
  };
};
