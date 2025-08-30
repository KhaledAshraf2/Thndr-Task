import React from 'react';

interface SplashScreenProps {
  isLoading: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ isLoading }) => {
  const [shouldRemove, setShouldRemove] = React.useState(false);

  React.useEffect(() => {
    if (isLoading) {
      return;
    }
    const removeTimer = setTimeout(() => {
      setShouldRemove(true);
    }, 500);

    return () => {
      clearTimeout(removeTimer);
    };
  }, [isLoading]);

  if (shouldRemove) {
    return null;
  }

  return (
    <div
      className={`fixed z-50 w-full h-full bg-blue-900 flex flex-col items-center justify-between p-4 transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}>
      <div className="text-center">
        <div className="mb-8">
          <img
            src="/nasdaq-logo.svg"
            alt="NASDAQ Logo"
            className="h-32 md:h-64 mx-auto"
          />
        </div>

        <h1 className="text-3xl md:text-6xl font-bold text-white mb-4">
          Stock Market
        </h1>

        <p className="text-lg md:text-2xl text-blue-200">
          Explore NASDAQ Stocks
        </p>

        <div className="mt-12">
          <div className="flex space-x-2 justify-center">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full animate-ping"></div>
            <div
              className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full animate-ping"
              style={{ animationDelay: '0.1s' }}></div>
            <div
              className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full animate-ping"
              style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-white text-sm md:text-lg opacity-80">
          Developed by Khaled Ashraf
        </h1>
      </div>
    </div>
  );
};
