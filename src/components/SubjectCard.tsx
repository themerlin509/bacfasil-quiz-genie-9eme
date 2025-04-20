
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
    <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-md hover:scale-105">
      <CardContent className="pt-6 p-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 text-primary text-4xl">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-3 text-primary">{title}</h3>
          <p className="text-gray-600 mb-6 text-sm">{description}</p>
          <Button 
            onClick={onClick} 
            className="bg-secondary hover:bg-secondary/90 text-white w-full"
          >
            Commencer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
