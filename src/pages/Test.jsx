import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { tests } from "../data/tests";
import AnimatedModal from "../components/AnimatedModal";
import ProgressBar from "../components/ProgressBar";
import Toast from "../components/Toast";
import AnimatedCard from "../components/AnimatedCard";
import AnimatedButton from "../components/AnimatedButton";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSlideIn } from "../hooks/useAnimation";

export default function Test() {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const questionSlide = useSlideIn('up', 0);

  useEffect(() => {
    // Simulate loading test data
    setIsLoading(true);
    const timer = setTimeout(() => {
      const foundTest = tests.find((t) => t.id === Number(id));
      setTest(foundTest);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <AnimatedCard className="w-full max-w-lg p-8 dark:bg-gray-800 dark:shadow-gray-900/20" delay={100}>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <LoadingSpinner size="lg" />
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Test yuklanmoqda...
            </p>
          </div>
        </AnimatedCard>
      </div>
    );
  }

  if (!test) return <div className="p-8 text-gray-800 dark:text-white">Test topilmadi.</div>;

  function handleAnswer(option) {
    const isCorrect = option === test.questions[current].answer;
    
    if (isCorrect) {
      setScore(score + 1);
      setToastMessage("To'g'ri javob! 🎉");
      setToastType("success");
    } else {
      setToastMessage("Noto'g'ri javob! 😔");
      setToastType("error");
    }
    
    setShowToast(true);

    if (current < test.questions.length - 1) {
      setTimeout(() => {
        setCurrent(current + 1);
        setShowToast(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setShowResult(true);
        setShowToast(false);
      }, 1000);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <AnimatedCard className="w-full max-w-lg p-8 dark:bg-gray-800 dark:shadow-gray-900/20" delay={100}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{test.title}</h2>
          <ProgressBar current={current + 1} total={test.questions.length} className="mb-4" />
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {current + 1} / {test.questions.length} savol
          </div>
        </div>

        <div className="mb-8" style={questionSlide.style}>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            {test.questions[current].question}
          </h3>
          
          <div className="space-y-3">
            {test.questions[current].options.map((opt, index) => (
              <AnimatedButton
                key={opt}
                variant="secondary"
                className="w-full text-left justify-start dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                delay={index * 100}
                onClick={() => handleAnswer(opt)}
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                {opt}
              </AnimatedButton>
            ))}
          </div>
        </div>
      </AnimatedCard>

      <AnimatedModal 
        isOpen={showResult} 
        onClose={() => setShowResult(false)}
        title="Test natijasi"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">
            {score === test.questions.length ? "🎉" : score > test.questions.length / 2 ? "👍" : "😔"}
          </div>
          <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
            {score === test.questions.length ? "Mukammal!" : score > test.questions.length / 2 ? "Yaxshi!" : "Yaxshilash kerak"}
          </h3>
          <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
            To'g'ri javoblar: <span className="font-bold text-blue-600 dark:text-blue-400">{score} / {test.questions.length}</span>
          </p>
          <div className="space-y-3">
            <Link to="/tests">
              <AnimatedButton variant="primary" className="w-full">
                Boshqa testlar
              </AnimatedButton>
            </Link>
            <AnimatedButton 
              variant="secondary"
              className="w-full"
              onClick={() => {
                setCurrent(0);
                setScore(0);
                setShowResult(false);
              }}
            >
              Qayta boshlash
            </AnimatedButton>
          </div>
        </div>
      </AnimatedModal>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
          duration={1000}
        />
      )}
    </div>
  );
}