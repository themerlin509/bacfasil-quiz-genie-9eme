
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface QuizExplanationProps {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  onNext: () => void;
}

const QuizExplanation = ({
  question,
  userAnswer,
  correctAnswer,
  explanation,
  onNext
}: QuizExplanationProps) => {
  const isCorrect = userAnswer === correctAnswer;
  
  return (
    <Card className="w-full quiz-container">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          {isCorrect ? (
            <div className="bg-green-100 text-green-700 p-3 rounded-full">
              <Check className="h-6 w-6" />
            </div>
          ) : (
            <div className="bg-red-100 text-red-600 p-3 rounded-full">
              <X className="h-6 w-6" />
            </div>
          )}
        </div>
        <CardTitle className="text-center mb-2">
          {isCorrect ? 'Bonne réponse!' : 'Réponse incorrecte'}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-700">Question:</h3>
          <p className="mt-1">{question}</p>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-700">Votre réponse:</h3>
          <p className={`mt-1 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {userAnswer || "Aucune réponse"}
          </p>
        </div>
        
        {!isCorrect && (
          <div>
            <h3 className="font-medium text-gray-700">Bonne réponse:</h3>
            <p className="mt-1 text-green-600">{correctAnswer}</p>
          </div>
        )}
        
        <div className="bg-blue-50 p-4 rounded-md">
          <h3 className="font-medium text-gray-700">Explication:</h3>
          <p className="mt-1 text-gray-600">{explanation}</p>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={onNext} 
          className="w-full bg-primary hover:bg-primary/90"
        >
          Question suivante
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizExplanation;
