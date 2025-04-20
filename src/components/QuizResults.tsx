
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface QuizResult {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface QuizResultsProps {
  results: QuizResult[];
  totalTime: number;
  onRetry: () => void;
  onHome: () => void;
}

const QuizResults = ({ results, totalTime, onRetry, onHome }: QuizResultsProps) => {
  const correctAnswers = results.filter(r => r.isCorrect).length;
  const score = Math.round((correctAnswers / results.length) * 100);
  
  const getScoreMessage = () => {
    if (score >= 90) return "Excellent! Tu maîtrises ce sujet!";
    if (score >= 70) return "Très bien! Continue comme ça!";
    if (score >= 50) return "Bon travail, mais il y a encore place à l'amélioration.";
    return "Continue à pratiquer, tu peux t'améliorer!";
  };
  
  return (
    <Card className="w-full quiz-container">
      <CardHeader>
        <CardTitle className="text-center">Résultats du Quiz</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary">{score}%</div>
          <p className="text-gray-500 mt-2">{correctAnswers} correctes sur {results.length} questions</p>
          <p className="mt-2 text-gray-700">{getScoreMessage()}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Score</span>
            <span>{score}%</span>
          </div>
          <Progress value={score} className="h-2" />
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-4">Résumé des questions</h3>
          <div className="space-y-3">
            {results.map((result, index) => (
              <div key={index} className="border-b pb-3">
                <div className="flex items-center gap-2">
                  {result.isCorrect ? (
                    <div className="h-4 w-4 rounded-full bg-green-500"></div>
                  ) : (
                    <div className="h-4 w-4 rounded-full bg-red-500"></div>
                  )}
                  <h4 className="font-medium">Question {index + 1}</h4>
                </div>
                <p className="text-sm text-gray-600 mt-1">{result.question}</p>
                <div className="mt-1 flex flex-col gap-1 text-sm">
                  <span>
                    <span className="font-medium">Votre réponse:</span>
                    <span className={result.isCorrect ? "text-green-600 ml-1" : "text-red-600 ml-1"}>
                      {result.userAnswer || "Aucune réponse"}
                    </span>
                  </span>
                  {!result.isCorrect && (
                    <span>
                      <span className="font-medium">Bonne réponse:</span>
                      <span className="text-green-600 ml-1">{result.correctAnswer}</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={onHome} 
          variant="outline" 
          className="w-full sm:w-1/2"
        >
          Retour à l'accueil
        </Button>
        <Button 
          onClick={onRetry} 
          className="w-full sm:w-1/2 bg-primary hover:bg-primary/90"
        >
          Refaire le quiz
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizResults;
