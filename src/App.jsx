import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import LoadingScreen from "./components/LoadingScreen";
import PageTransition from "./components/PageTransition";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Vocabulary from "./pages/Vocabulary";
import Tests from "./pages/Tests";
import Test from "./pages/Test";
import Articles from "./pages/Articles";

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <LoadingScreen isLoading={isInitialLoading}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navbar />
          <div className="pt-16">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/vocabulary" element={<Vocabulary />} />
                <Route path="/tests" element={<Tests />} />
                <Route path="/tests/:id" element={<Test />} />
                <Route path="/articles" element={<Articles />} />
              </Routes>
            </PageTransition>
          </div>
        </div>
      </LoadingScreen>
    </ThemeProvider>
  );
}
