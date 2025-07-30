import { useState, useEffect } from "react";
import { vocabularySets } from "../data/vocabulary";
import AnimatedCard from "../components/AnimatedCard";
import AnimatedButton from "../components/AnimatedButton";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toast";
import { useSlideIn, useFadeIn } from "../hooks/useAnimation";

export default function Vocabulary() {
  const [setIndex, setSetIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [isWordChanging, setIsWordChanging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const set = vocabularySets[setIndex];
  const word = set.words[wordIndex];

  const titleSlide = useSlideIn('up', 0);
  const cardSlide = useSlideIn('up', 200);
  const isVisible = useFadeIn(0);

  useEffect(() => {
    // Simulate loading vocabulary data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  function nextWord() {
    setIsWordChanging(true);
    setTimeout(() => {
      setWordIndex((i) => (i + 1) % set.words.length);
      setIsWordChanging(false);
      setShowToast(true);
    }, 300);
  }

  function prevWord() {
    setIsWordChanging(true);
    setTimeout(() => {
      setWordIndex((i) => (i - 1 + set.words.length) % set.words.length);
      setIsWordChanging(false);
      setShowToast(true);
    }, 300);
  }

  function changeSet(idx) {
    setSetIndex(idx);
    setWordIndex(0);
    setShowToast(true);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <AnimatedCard className="w-full max-w-lg p-8 dark:bg-gray-800 dark:shadow-gray-900/20" delay={100}>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <LoadingSpinner size="lg" />
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Lug'at yuklanmoqda...
            </p>
          </div>
        </AnimatedCard>
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s ease-out'
      }}
    >
      <div className="w-full max-w-lg px-4">
        <h2 
          className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center"
          style={titleSlide.style}
        >
          Lug'at amaliyoti
        </h2>
        
        <AnimatedCard className="p-8 dark:bg-gray-800 dark:shadow-gray-900/20" delay={100}>
          <div className="flex gap-2 mb-6 justify-center flex-wrap">
            {vocabularySets.map((s, idx) => (
              <AnimatedButton
                key={s.id}
                variant={idx === setIndex ? "primary" : "secondary"}
                className="px-4 py-2 rounded-full text-sm dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                delay={idx * 100}
                onClick={() => changeSet(idx)}
              >
                {s.title}
              </AnimatedButton>
            ))}
          </div>

          <div className="text-center">
            <div 
              className="text-4xl font-bold text-gray-800 dark:text-white mb-4 transition-all duration-300"
              style={{
                opacity: isWordChanging ? 0 : 1,
                transform: isWordChanging ? 'scale(0.8)' : 'scale(1)'
              }}
            >
              {word.word}
            </div>
            <div 
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 transition-all duration-300"
              style={{
                opacity: isWordChanging ? 0 : 1,
                transform: isWordChanging ? 'translateY(10px)' : 'translateY(0)'
              }}
            >
              {word.meaning}
            </div>
            
            <div className="flex justify-between">
              <AnimatedButton
                variant="secondary"
                className="px-6 py-3"
                delay={600}
                onClick={prevWord}
              >
                ← Oldingi
              </AnimatedButton>
              <AnimatedButton
                variant="primary"
                className="px-6 py-3"
                delay={700}
                onClick={nextWord}
              >
                Keyingi →
              </AnimatedButton>
            </div>
          </div>
        </AnimatedCard>
      </div>

      {showToast && (
        <Toast
          message="So'z o'zgartirildi!"
          type="info"
          onClose={() => setShowToast(false)}
          duration={1500}
        />
      )}
    </div>
  );
}