import { useState } from 'react';
import { useScale } from '../hooks/useAnimation';

export default function AnimatedButton({ 
  children, 
  className = "", 
  onClick, 
  delay = 0,
  variant = "primary" 
}) {
  const [isPressed, setIsPressed] = useState(false);
  const scale = useScale(delay);

  const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all duration-200 ease-out";
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
    success: "bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600",
    danger: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        ...scale.style,
        transform: isPressed 
          ? 'scale(0.95)' 
          : scale.style.transform
      }}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      {children}
    </button>
  );
} 