
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getQuizHistory, getStatsBySubject, clearQuizHistory } from '@/lib/storage';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { toast } from 'sonner';

const Progress = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  
  const history = getQuizHistory();
  const stats = getStatsBySubject(selectedSubject === 'all' ? '' : selectedSubject);
  
  // Prepare chart data - last 10 quizzes
  const chartData = history
    .filter(item => selectedSubject === 'all' || item.settings.subject === selectedSubject)
    .slice(-10)
    .map((item, index) => ({
      name: `Quiz ${index + 1}`,
      score: item.score,
      subject: item.settings.subject
    }));
  
  // Format date string
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit', 
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (e) {
      return 'Date invalide';
    }
  };

  // Handle clear history
  const handleClearHistory = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer tout votre historique de quiz? Cette action est irréversible.')) {
      clearQuizHistory();
      toast.success('Historique de quiz effacé');
      navigate(0); // Refresh page
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto quiz-container">
          <h1 className="text-3xl font-bold mb-6 text-center">Suivi de Progression</h1>
          
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="stats">Statistiques</TabsTrigger>
              <TabsTrigger value="history">Historique</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stats" className="space-y-6 mt-6">
              <div className="flex flex-wrap gap-4 mb-6">
                <Button 
                  variant={selectedSubject === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedSubject('all')}
                  className={selectedSubject === 'all' ? 'bg-primary' : ''}
                >
                  Tous
                </Button>
                <Button 
                  variant={selectedSubject === 'Mathématiques' ? 'default' : 'outline'} 
                  onClick={() => setSelectedSubject('Mathématiques')}
                  className={selectedSubject === 'Mathématiques' ? 'bg-primary' : ''}
                >
                  Mathématiques
                </Button>
                <Button 
                  variant={selectedSubject === 'Français' ? 'default' : 'outline'} 
                  onClick={() => setSelectedSubject('Français')}
                  className={selectedSubject === 'Français' ? 'bg-primary' : ''}
                >
                  Français
                </Button>
                <Button 
                  variant={selectedSubject === 'Sciences' ? 'default' : 'outline'} 
                  onClick={() => setSelectedSubject('Sciences')}
                  className={selectedSubject === 'Sciences' ? 'bg-primary' : ''}
                >
                  Sciences
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Quiz</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalQuizzes}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Score moyen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.avgScore}%</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Meilleur score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.bestScore}%</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Questions répondues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalQuestions}</div>
                  </CardContent>
                </Card>
              </div>
              
              {chartData.length > 0 ? (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Évolution des scores</CardTitle>
                    <CardDescription>
                      {selectedSubject === 'all' 
                        ? 'Tous les sujets' 
                        : `Sujet: ${selectedSubject}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Bar 
                            dataKey="score" 
                            fill="#ea384c" 
                            name="Score (%)"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="mt-6">
                  <CardContent className="pt-6 text-center">
                    <p className="text-gray-500">Pas encore de données disponibles.</p>
                    <p className="text-gray-500">Complétez quelques quiz pour voir vos statistiques.</p>
                    <Button 
                      onClick={() => navigate('/')} 
                      className="mt-4 bg-primary hover:bg-primary/90"
                    >
                      Commencer un quiz
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4 mt-6">
              {history.length > 0 ? (
                <>
                  <div className="flex justify-end mb-4">
                    <Button 
                      variant="outline" 
                      onClick={handleClearHistory}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      Effacer l'historique
                    </Button>
                  </div>
                  
                  {history.slice().reverse().map((item, index) => (
                    <Card key={item.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">
                            {item.settings.subject}
                          </CardTitle>
                          <span className="text-sm text-gray-500">
                            {formatDate(item.date)}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500">
                              Difficulté: {item.settings.difficulty}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.correctAnswers} correctes sur {item.totalQuestions} questions
                            </p>
                          </div>
                          <div className="text-2xl font-bold text-primary">{item.score}%</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-gray-500">Aucun historique de quiz disponible.</p>
                    <Button 
                      onClick={() => navigate('/')} 
                      className="mt-4 bg-primary hover:bg-primary/90"
                    >
                      Commencer un quiz
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Progress;
