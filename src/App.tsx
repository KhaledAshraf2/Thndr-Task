import { useInfiniteTickers } from '@/hooks/useInfiniteTickers';
import { SplashScreen } from '@/components/SplashScreen';

function App() {
  const { tickers, isInitialLoading, error } = useInfiniteTickers();

  const shouldShowSplash = isInitialLoading || (tickers.length === 0 && !error);

  return (
    <>
      <SplashScreen isLoading={shouldShowSplash} />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Thndr Stock App
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome to the stock market app! The splash screen is working
            correctly.
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
