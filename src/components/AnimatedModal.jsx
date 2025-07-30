import { useEffect } from 'react';
import { useScale } from '../hooks/useAnimation';

export default function AnimatedModal({ isOpen, onClose, children, title }) {
  const scale = useScale(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
        style={{
          ...scale.style,
          animation: 'slideIn 0.4s ease-out'
        }}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl transition-colors duration-200"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: scale(0.8) translateY(-20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
} 