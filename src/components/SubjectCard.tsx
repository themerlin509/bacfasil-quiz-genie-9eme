
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SubjectCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  onClick: () => void;
}

const SubjectCard = ({ title, icon, description, onClick }: SubjectCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-primary">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 text-primary text-4xl">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <Button 
            onClick={onClick} 
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Commencer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
