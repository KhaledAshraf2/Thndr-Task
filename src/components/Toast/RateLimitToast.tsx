import toast from 'react-hot-toast';

export const showRateLimitToast = (
  id: string,
  countdown: number,
  onRetry: () => void,
): string => {
  return toast.custom(
    (t) => (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 shadow-sm">
        <div className="flex flex-col items-center space-y-2">
          <p className="text-sm text-yellow-800">
            Rate limit reached, retry in
          </p>
          <button
            type="button"
            disabled={countdown > 0}
            onClick={() => {
              onRetry();
              toast.dismiss(t.id);
            }}
            className={`w-20 px-3 py-1.5 rounded-md text-sm font-medium ${
              countdown > 0
                ? 'bg-yellow-100 text-yellow-600 cursor-not-allowed'
                : 'bg-yellow-600 text-white hover:bg-yellow-700 active:bg-yellow-800 cursor-pointer'
            }`}>
            {countdown > 0 ? `${countdown}s` : 'Now'}
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
