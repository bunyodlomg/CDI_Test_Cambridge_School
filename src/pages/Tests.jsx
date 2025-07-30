import { Link } from "react-router-dom";
import { tests } from "../data/tests";
import AnimatedCard from "../components/AnimatedCard";
import { useSlideIn } from "../hooks/useAnimation";

export default function Tests() {
  const titleSlide = useSlideIn('up', 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-2xl px-4">
        <h2 
          className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center"
          style={titleSlide.style}
        >
          Mavjud testlar
        </h2>
        <div className="grid gap-6">
          {tests.map((test, index) => (
            <Link key={test.id} to={`/tests/${test.id}`}>
              <AnimatedCard 
                className="p-6 cursor-pointer dark:bg-gray-800 dark:shadow-gray-900/20" 
                delay={index * 200}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      {test.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {test.questions.length} ta savol
                    </p>
                  </div>
                  <div className="text-2xl text-gray-400 dark:text-gray-500">
                    {index + 1}
                  </div>
                </div>
              </AnimatedCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}