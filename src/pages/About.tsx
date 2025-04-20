
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto quiz-container">
          <h1 className="text-3xl font-bold mb-6 text-center">À propos de BacFasil 9<sup>ème</sup></h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Notre mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                BacFasil 9<sup>ème</sup> a été créé pour aider les étudiants haïtiens de 9ème année à se préparer
                efficacement pour leurs examens, en particulier le baccalauréat haïtien.
              </p>
              <p>
                Notre plateforme utilise l'intelligence artificielle pour générer des questions
                de quiz personnalisées qui correspondent au programme scolaire haïtien, permettant
                aux étudiants de pratiquer et d'améliorer leurs connaissances dans différentes matières.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Comment ça marche</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Choisissez une matière</h3>
                <p className="text-gray-600">
                  Sélectionnez la matière que vous souhaitez pratiquer parmi les options disponibles.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">2. Personnalisez votre quiz</h3>
                <p className="text-gray-600">
                  Définissez la difficulté, le nombre de questions et le temps par question selon vos besoins.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">3. Répondez aux questions</h3>
                <p className="text-gray-600">
                  Mettez vos connaissances à l'épreuve en répondant aux questions générées par l'IA.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">4. Apprenez des explications</h3>
                <p className="text-gray-600">
                  Après chaque réponse, recevez une explication détaillée pour mieux comprendre le sujet.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">5. Suivez vos progrès</h3>
                <p className="text-gray-600">
                  Consultez vos statistiques et votre historique pour voir votre progression au fil du temps.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Pour toute question, suggestion ou problème technique, n'hésitez pas à nous contacter:
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a href="mailto:pierrerobertoleblanc1@gmail.com" className="text-secondary hover:underline">
                  pierrerobertoleblanc1@gmail.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
