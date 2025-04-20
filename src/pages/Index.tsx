
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SubjectCard from '@/components/SubjectCard';
import QuizOptions, { QuizSettings } from '@/components/QuizOptions';
import { Book, Star, Check } from 'lucide-react';

const subjects = [
  {
    title: "Mathématiques",
    icon: <Star />,
    description: "Algèbre, géométrie, arithmétique et plus"
  },
  {
    title: "Français",
    icon: <Book />,
    description: "Grammaire, littérature, compréhension de texte"
  },
  {
    title: "Sciences",
    icon: <Check />,
    description: "Biologie, physique, chimie et sciences de la terre"
  }
];

const Index = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleSelectSubject = (subject: string) => {
    setSelectedSubject(subject);
  };

  const handleBack = () => {
    setSelectedSubject(null);
  };

  const handleStartQuiz = (options: QuizSettings) => {
    // Store the quiz settings in localStorage to use in the quiz page
    localStorage.setItem('quizSettings', JSON.stringify(options));
    
    // Navigate to the quiz page
    window.location.href = '/quiz';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {!selectedSubject ? (
          <div className="quiz-container">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold mb-4 text-gray-900">BacFasil 9<sup>ème</sup></h1>
              <p className="text-lg text-gray-600">
                Préparez-vous pour le baccalauréat haïtien avec des quiz générés par intelligence artificielle.
                Choisissez votre matière et commencez à apprendre!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <SubjectCard
                  key={subject.title}
                  title={subject.title}
                  icon={subject.icon}
                  description={subject.description}
                  onClick={() => handleSelectSubject(subject.title)}
                />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/progress" className="text-secondary hover:underline">
                Voir mes progrès
              </Link>
            </div>
          </div>
        ) : (
          <QuizOptions
            subject={selectedSubject}
            onStart={handleStartQuiz}
            onBack={handleBack}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
