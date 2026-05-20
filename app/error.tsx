'use client';

import { useEffect } from 'react';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Root error boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-500 mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
