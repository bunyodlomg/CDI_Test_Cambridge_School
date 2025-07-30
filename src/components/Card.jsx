export default function Card({ children, className = "", onClick }) {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
} 