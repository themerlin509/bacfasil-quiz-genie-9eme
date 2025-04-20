
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuizQuestion from '@/components/QuizQuestion';
import QuizExplanation from '@/components/QuizExplanation';
import QuizResults from '@/components/QuizResults';
import { QuizSettings } from '@/components/QuizOptions';
import { generateQuestions } from '@/lib/ai';
import { saveQuizResult } from '@/lib/storage';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';

interface Question {
  question: string;
  choices: string[];
  correctAnswer: string;
  explanation: string;
}

interface Answer {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
}

const Quiz = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<QuizSettings | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [showingExplanation, setShowingExplanation] = useState(false);
  const [showingResults, setShowingResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [quizStartTime, setQuizStartTime] = useState<number>(0);

  useEffect(() => {
    // Get quiz settings from localStorage
    try {
      const storedSettings = localStorage.getItem('quizSettings');
      if (!storedSettings) {
        toast.error("Erreur: paramètres de quiz introuvables");
        navigate('/');
        return;
      }
      
      const parsedSettings = JSON.parse(storedSettings);
      setSettings(parsedSettings);
      
      // Generate questions
      setIsLoading(true);
      generateQuestions(
        parsedSettings.subject, 
        parsedSettings.difficulty,
        parsedSettings.questionCount
      )
        .then(generatedQuestions => {
          setQuestions(generatedQuestions);
          setIsLoading(false);
          setQuizStartTime(Date.now());
        })
        .catch(error => {
          console.error("Error generating questions:", error);
          toast.error("Erreur lors de la génération des questions");
          navigate('/');
        });
      
    } catch (error) {
      console.error("Error setting up quiz:", error);
      toast.error("Erreur lors de la configuration du quiz");
      navigate('/');
    }
  }, [navigate]);

  const handleAnswer = (answer: string) => {
    if (!questions[currentQuestionIndex]) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    const newAnswer: Answer = {
      question: currentQuestion.question,
      userAnswer: answer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      explanation: currentQuestion.explanation
    };
    
    setUserAnswers([...userAnswers, newAnswer]);
    setShowingExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowingExplanation(false);
    
    if (currentQuestionIndex + 1 >= questions.length) {
      finishQuiz();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const finishQuiz = () => {
    if (!settings) return;
    
    const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
    const score = Math.round((correctAnswers / questions.length) * 100);
    
    // Save result to history
    saveQuizResult(
      settings,
      score,
      questions.length,
      correctAnswers
    );
    
    setShowingResults(true);
  };

  const handleRetry = () => {
    if (!settings) return;
    
    setIsLoading(true);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowingExplanation(false);
    setShowingResults(false);
    
    generateQuestions(
      settings.subject, 
      settings.difficulty,
      settings.questionCount
    )
      .then(generatedQuestions => {
        setQuestions(generatedQuestions);
        setIsLoading(false);
        setQuizStartTime(Date.now());
      })
      .catch(error => {
        console.error("Error generating questions:", error);
        toast.error("Erreur lors de la génération des questions");
        navigate('/');
      });
  };

  const handleHome = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary border-r-2 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Génération des questions en cours...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (showingResults) {
    const totalTime = Math.floor((Date.now() - quizStartTime) / 1000);
    
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <QuizResults
              results={userAnswers}
              totalTime={totalTime}
              onRetry={handleRetry}
              onHome={handleHome}
            />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!settings || questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-4">Erreur lors du chargement du quiz.</p>
            <Button onClick={handleHome}>Retourner à l'accueil</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {!showingExplanation ? (
            <QuizQuestion
              question={currentQuestion.question}
              choices={currentQuestion.choices}
              timePerQuestion={settings.timePerQuestion}
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              onAnswer={handleAnswer}
            />
          ) : (
            <QuizExplanation
              question={currentQuestion.question}
              userAnswer={userAnswers[userAnswers.length - 1].userAnswer}
              correctAnswer={currentQuestion.correctAnswer}
              explanation={currentQuestion.explanation}
              onNext={handleNextQuestion}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;
