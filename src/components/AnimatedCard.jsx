import { useState } from 'react';
import { useSlideIn } from '../hooks/useAnimation';

export default function AnimatedCard({ children, className = "", onClick, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const slideIn = useSlideIn('up', delay);

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 transition-all duration-300 ease-out ${className}`}
      style={{
        ...slideIn.style,
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : slideIn.style.transform,
        boxShadow: isHovered 
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
} 