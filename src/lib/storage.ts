
import { QuizSettings } from "@/components/QuizOptions";

export interface QuizHistory {
  id: string;
  date: string;
  settings: QuizSettings;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
}

// Get all quiz history
export const getQuizHistory = (): QuizHistory[] => {
  try {
    const history = localStorage.getItem('quizHistory');
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

// Save quiz result to history
export const saveQuizResult = (
  settings: QuizSettings,
  score: number,
  totalQuestions: number,
  correctAnswers: number
): void => {
  try {
    const history = getQuizHistory();
    const newEntry: QuizHistory = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      settings,
      score,
      totalQuestions,
      correctAnswers
    };
    
    history.push(newEntry);
    localStorage.setItem('quizHistory', JSON.stringify(history));
  } catch (error) {
    console.error("Failed to save quiz history", error);
  }
};

// Get statistics by subject
export const getStatsBySubject = (subject: string): {
  totalQuizzes: number;
  avgScore: number;
  bestScore: number;
  totalQuestions: number;
} => {
  const history = getQuizHistory();
  const subjectHistory = subject ? history.filter(h => h.settings.subject === subject) : history;
  
  if (subjectHistory.length === 0) {
    return {
      totalQuizzes: 0,
      avgScore: 0,
      bestScore: 0,
      totalQuestions: 0
    };
  }
  
  const totalQuizzes = subjectHistory.length;
  const totalScore = subjectHistory.reduce((sum, item) => sum + item.score, 0);
  const avgScore = Math.round(totalScore / totalQuizzes);
  const bestScore = Math.max(...subjectHistory.map(item => item.score));
  const totalQuestions = subjectHistory.reduce((sum, item) => sum + item.totalQuestions, 0);
  
  return {
    totalQuizzes,
    avgScore,
    bestScore,
    totalQuestions
  };
};

// Clear all quiz history
export const clearQuizHistory = (): void => {
  localStorage.removeItem('quizHistory');
};
