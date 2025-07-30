import { useState, useEffect } from 'react';

export default function LoadingScreen({ isLoading, children }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center z-50">
        <div className="text-center max-w-md mx-auto px-4">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
              CDI Platforma
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Zamonaviy test platformasi
            </p>
          </div>

          {/* Animated Loading Spinner */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 dark:border-gray-700 rounded-full animate-pulse"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Yuklanmoqda...
            </p>
          </div>

          {/* Animated Dots */}
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}
    >
      {children}
    </div>
  );
} 