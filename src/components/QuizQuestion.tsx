
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface QuizQuestionProps {
  question: string;
  choices: string[];
  timePerQuestion: number;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
}

const QuizQuestion = ({
  question,
  choices,
  timePerQuestion,
  currentQuestion,
  totalQuestions,
  onAnswer
}: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  // Reset when question changes
  useEffect(() => {
    setSelectedAnswer('');
    setTimeLeft(timePerQuestion);
    setIsSubmitted(false);
  }, [question, timePerQuestion]);

  const handleSubmit = () => {
    setIsSubmitted(true);
    onAnswer(selectedAnswer);
  };

  return (
    <Card className="w-full quiz-container">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium text-gray-500">
            Question {currentQuestion} / {totalQuestions}
          </div>
          <div className="text-sm font-medium text-gray-500">
            Temps: {timeLeft} secondes
          </div>
        </div>
        <Progress 
          value={(timeLeft / timePerQuestion) * 100} 
          className="h-2 bg-gray-200"
        />
        <CardTitle className="mt-4">{question}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <RadioGroup 
          value={selectedAnswer} 
          onValueChange={setSelectedAnswer}
          className="space-y-3"
        >
          {choices.map((choice, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-gray-50">
              <RadioGroupItem 
                value={choice} 
                id={`choice-${index}`} 
                disabled={isSubmitted}
              />
              <Label className="w-full cursor-pointer" htmlFor={`choice-${index}`}>
                {choice}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={!selectedAnswer || isSubmitted}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Soumettre
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizQuestion;
