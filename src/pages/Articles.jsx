import { articles } from "../data/articles";
import AnimatedCard from "../components/AnimatedCard";
import { useSlideIn } from "../hooks/useAnimation";

export default function Articles() {
  const titleSlide = useSlideIn('up', 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-4xl px-4">
        <h2 
          className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center"
          style={titleSlide.style}
        >
          Foydali maqolalar
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article, index) => (
            <AnimatedCard
              key={article.id}
              className="p-6 dark:bg-gray-800 dark:shadow-gray-900/20"
              delay={index * 200}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {article.title}
                </h3>
                <span className="text-2xl text-gray-400 dark:text-gray-500">
                  {index + 1}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {article.content}
              </p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </div>
  );
}