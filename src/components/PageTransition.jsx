import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center z-40">
        <div className="text-center max-w-sm mx-auto px-4">
          {/* Loading Spinner */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-blue-200 dark:border-gray-700 rounded-full animate-pulse"></div>
              <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
            </div>
          </div>

          {/* Loading Text */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
            Sahifa yuklanmoqda...
          </p>

          {/* Animated Dots */}
          <div className="flex justify-center space-x-1">
            <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {displayChildren}
    </div>
  );
} 