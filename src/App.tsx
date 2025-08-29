import { useState } from 'react';
import { SplashScreen } from '@/components/SplashScreen';
import { API_BASE_URL, API_KEY } from '@/constants';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }
  console.log('App is running', API_BASE_URL, API_KEY);

  return (
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
  );
}

export default App;
