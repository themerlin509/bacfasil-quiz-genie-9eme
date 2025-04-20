
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface QuizOptionsProps {
  subject: string;
  onStart: (options: QuizSettings) => void;
  onBack: () => void;
}

export interface QuizSettings {
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  timePerQuestion: number;
}

const QuizOptions = ({ subject, onStart, onBack }: QuizOptionsProps) => {
  const [difficulty, setDifficulty] = React.useState<'easy' | 'medium' | 'hard'>('medium');
  const [questionCount, setQuestionCount] = React.useState(5);
  const [timePerQuestion, setTimePerQuestion] = React.useState(60);

  const handleStart = () => {
    onStart({
      subject,
      difficulty,
      questionCount,
      timePerQuestion
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto quiz-container">
      <CardHeader>
        <CardTitle className="text-center">Options du Quiz - {subject}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Difficulté:</h3>
            <RadioGroup 
              defaultValue="medium" 
              value={difficulty}
              onValueChange={(val) => setDifficulty(val as 'easy' | 'medium' | 'hard')}
              className="flex space-x-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="easy" id="easy" />
                <Label htmlFor="easy">Facile</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Moyen</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hard" id="hard" />
                <Label htmlFor="hard">Difficile</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Nombre de questions: {questionCount}</h3>
            <Slider
              value={[questionCount]}
              min={3}
              max={20}
              step={1}
              onValueChange={(value) => setQuestionCount(value[0])}
              className="py-4"
            />
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Temps par question: {timePerQuestion} secondes</h3>
            <Slider
              value={[timePerQuestion]}
              min={15}
              max={120}
              step={5}
              onValueChange={(value) => setTimePerQuestion(value[0])}
              className="py-4"
            />
          </div>
          
          <div className="flex space-x-4 pt-4">
            <Button variant="outline" onClick={onBack} className="w-1/2">
              Retour
            </Button>
            <Button onClick={handleStart} className="w-1/2 bg-primary hover:bg-primary/90">
              Commencer le Quiz
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizOptions;
