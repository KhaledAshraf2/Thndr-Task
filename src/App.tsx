import { useInfiniteTickers } from '@/hooks/useInfiniteTickers';
import { SplashScreen } from '@/components/SplashScreen';
import { StocksPage } from '@/pages/StocksPage';

function App() {
  const { tickers, isLoading, error } = useInfiniteTickers();

  const shouldShowSplash = isLoading || (tickers.length === 0 && !error);

  return (
    <>
      <SplashScreen isLoading={shouldShowSplash} />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <StocksPage />
      </div>
    </>
  );
}

export default App;
