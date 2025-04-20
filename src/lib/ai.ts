
import { toast } from "sonner";

interface AIResponse {
  question: string;
  choices: string[];
  correctAnswer: string;
  explanation: string;
}

export const generateQuestions = async (
  subject: string,
  difficulty: string,
  count: number
): Promise<AIResponse[]> => {
  try {
    const apiKey = "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";
    
    const prompt = `Génère ${count} questions de quiz pour des étudiants haïtiens de 9ème année sur le sujet "${subject}" avec un niveau de difficulté "${difficulty}". 
    Les questions doivent être basées sur le programme du baccalauréat haïtien.
    
    Format de réponse requis (en JSON):
    [
      {
        "question": "La question complète",
        "choices": ["choix 1", "choix 2", "choix 3", "choix 4"],
        "correctAnswer": "le choix correct (doit être identique à l'un des choix)",
        "explanation": "Une explication détaillée de la bonne réponse"
      }
    ]`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "google/gemini-pro",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("AI API error:", errorData);
      throw new Error("Erreur lors de la génération des questions");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    let parsedContent;
    
    try {
      // Try to parse the content directly
      parsedContent = JSON.parse(content);
      
      // If the AI returned an object with questions property
      if (parsedContent.questions) {
        return parsedContent.questions;
      }
      
      // If the AI returned an array directly
      if (Array.isArray(parsedContent)) {
        return parsedContent;
      }
      
      // Fallback if the structure is different
      return fallbackQuestions(subject, count);
    } catch (error) {
      console.error("Failed to parse AI response:", error);
      console.log("Raw content:", content);
      return fallbackQuestions(subject, count);
    }
  } catch (error) {
    console.error("Error generating questions:", error);
    toast.error("Erreur lors de la génération des questions. Utilisation des questions de secours.");
    return fallbackQuestions(subject, count);
  }
};

// Fallback questions in case the AI fails
const fallbackQuestions = (subject: string, count: number): AIResponse[] => {
  const questions: AIResponse[] = [];
  
  const mathQuestions = [
    {
      question: "Quelle est la formule pour calculer l'aire d'un cercle?",
      choices: ["A = πr²", "A = 2πr", "A = πd", "A = r²"],
      correctAnswer: "A = πr²",
      explanation: "L'aire d'un cercle se calcule en multipliant π (pi) par le carré du rayon (r²)."
    },
    {
      question: "Si x + 3 = 7, quelle est la valeur de x?",
      choices: ["3", "4", "7", "10"],
      correctAnswer: "4",
      explanation: "Pour résoudre x + 3 = 7, on soustrait 3 des deux côtés: x = 7 - 3 = 4."
    },
    {
      question: "Quel est le PGCD de 24 et 36?",
      choices: ["6", "12", "18", "24"],
      correctAnswer: "12",
      explanation: "Le plus grand commun diviseur (PGCD) de 24 et 36 est 12."
    }
  ];
  
  const scienceQuestions = [
    {
      question: "Quel est l'organe principal du système respiratoire?",
      choices: ["Cœur", "Poumons", "Foie", "Reins"],
      correctAnswer: "Poumons",
      explanation: "Les poumons sont les organes principaux du système respiratoire où se produit l'échange d'oxygène et de dioxyde de carbone."
    },
    {
      question: "Quelle est l'unité de mesure de la force?",
      choices: ["Watt", "Joule", "Newton", "Pascal"],
      correctAnswer: "Newton",
      explanation: "Le Newton (N) est l'unité de mesure de la force, nommée d'après Sir Isaac Newton."
    },
    {
      question: "Quel est le symbole chimique de l'oxygène?",
      choices: ["O", "Ox", "Og", "Om"],
      correctAnswer: "O",
      explanation: "Le symbole chimique de l'oxygène est O dans le tableau périodique des éléments."
    }
  ];
  
  const frenchQuestions = [
    {
      question: "Quel est le participe passé du verbe 'finir'?",
      choices: ["fini", "finit", "finisse", "finira"],
      correctAnswer: "fini",
      explanation: "Le participe passé du verbe 'finir' est 'fini'. Ex: J'ai fini mes devoirs."
    },
    {
      question: "Quel est le pluriel de 'journal'?",
      choices: ["journals", "journaux", "journales", "journeaux"],
      correctAnswer: "journaux",
      explanation: "Le pluriel de 'journal' est 'journaux'. C'est une exception à la règle générale."
    },
    {
      question: "Identifiez l'adverbe dans la phrase: 'Il parle doucement à son ami.'",
      choices: ["Il", "parle", "doucement", "ami"],
      correctAnswer: "doucement",
      explanation: "'Doucement' est un adverbe qui modifie le verbe 'parle' en indiquant la manière."
    }
  ];
  
  // Select questions based on subject
  let sourceQuestions: AIResponse[] = [];
  
  if (subject === "Mathématiques") {
    sourceQuestions = mathQuestions;
  } else if (subject === "Sciences") {
    sourceQuestions = scienceQuestions;
  } else if (subject === "Français") {
    sourceQuestions = frenchQuestions;
  } else {
    // Mix questions if subject doesn't match
    sourceQuestions = [...mathQuestions, ...scienceQuestions, ...frenchQuestions];
  }
  
  // Get the requested number of questions
  for (let i = 0; i < count; i++) {
    questions.push(sourceQuestions[i % sourceQuestions.length]);
  }
  
  return questions;
};
