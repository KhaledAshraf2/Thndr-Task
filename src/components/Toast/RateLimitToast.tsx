import toast from 'react-hot-toast';

export const showRateLimitToast = (
  id: string,
  countdown: number,
  onRetry: () => void,
  isLoading: boolean = false,
): string => {
  return toast.custom(
    () => (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 shadow-sm">
        <div className="flex flex-col items-center space-y-2">
          <p className="text-sm text-yellow-800">Rate limit reached</p>
          <button
            type="button"
            disabled={countdown > 0 || isLoading}
            onClick={() => {
              onRetry();
            }}
            className="px-4 py-2 rounded-md text-sm font-medium bg-yellow-600 text-white hover:bg-yellow-700 active:bg-yellow-800 cursor-pointer disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-100">
            {isLoading
              ? 'Retrying...'
              : countdown > 0
              ? `${countdown}s`
              : 'Retry'}
          </button>
        </div>
      </div>
    ),
    {
      id,
      duration: Infinity,
      position: 'top-right',
    },
  );
};
