import { Link } from "react-router-dom";
import AnimatedCard from "../components/AnimatedCard";
import AnimatedButton from "../components/AnimatedButton";
import { useSlideIn, useFadeIn } from "../hooks/useAnimation";

export default function Home() {
  const titleSlide = useSlideIn('up', 0);
  const descriptionSlide = useSlideIn('up', 200);
  const buttonsSlide = useSlideIn('up', 400);
  const isVisible = useFadeIn(0);

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s ease-out'
      }}
    >
      <div className="w-full max-w-2xl px-4">
        <AnimatedCard className="p-12 text-center dark:bg-gray-800 dark:shadow-gray-900/20" delay={100}>
          <h1 
            className="text-5xl font-bold text-gray-800 dark:text-white mb-6"
            style={titleSlide.style}
          >
            CDI Test Platformasiga xush kelibsiz!
          </h1>
          <p 
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            style={descriptionSlide.style}
          >
            Minimal va zamonaviy dizayn, animatsiyali interfeys va qulay testlar! 
            Ingliz tilini o'rganish va test topshirish uchun professional platforma.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={buttonsSlide.style}
          >
            <Link to="/tests">
              <AnimatedButton 
                variant="primary" 
                className="w-full sm:w-auto shadow-lg hover:shadow-xl"
                delay={600}
              >
                Testlarni boshlash
              </AnimatedButton>
            </Link>
            <Link to="/vocabulary">
              <AnimatedButton 
                variant="secondary" 
                className="w-full sm:w-auto"
                delay={800}
              >
                Lug'at amaliyoti
              </AnimatedButton>
            </Link>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}