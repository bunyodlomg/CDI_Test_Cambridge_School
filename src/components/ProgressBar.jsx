export default function ProgressBar({ current, total, className = "" }) {
  const percentage = (current / total) * 100;

  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
} 