
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
      return getFallbackQuestions(subject, count);
    } catch (error) {
      console.error("Failed to parse AI response:", error);
      console.log("Raw content:", content);
      return getFallbackQuestions(subject, count);
    }
  } catch (error) {
    console.error("Error generating questions:", error);
    toast.error("Erreur lors de la génération des questions. Utilisation des questions de secours.");
    return getFallbackQuestions(subject, count);
  }
};

// Improved fallback questions organized by subject
const getFallbackQuestions = (subject: string, count: number): AIResponse[] => {
  // Select the appropriate question set based on the subject
  let questionSet: AIResponse[] = [];
  
  switch (subject) {
    case "Mathématiques":
      questionSet = mathQuestions;
      break;
    case "Communication créole":
      questionSet = creoleQuestions;
      break;
    case "Sciences expérimentales":
      questionSet = scienceQuestions;
      break;
    case "Sciences sociales":
      questionSet = socialScienceQuestions;
      break;
    case "Langue anglaise":
      questionSet = englishQuestions;
      break;
    case "Langue espagnole":
      questionSet = spanishQuestions;
      break;
    case "Physique":
      questionSet = physicsQuestions;
      break;
    default:
      // Mix questions if subject doesn't match
      questionSet = [...mathQuestions];
      break;
  }
  
  // Get the requested number of questions, repeating if necessary
  const questions: AIResponse[] = [];
  for (let i = 0; i < count; i++) {
    questions.push(questionSet[i % questionSet.length]);
  }
  
  return questions;
};

// Fallback questions for each subject
const mathQuestions: AIResponse[] = [
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
  },
  {
    question: "Résolvez l'équation 2x - 5 = 11",
    choices: ["x = 8", "x = 3", "x = -3", "x = 7"],
    correctAnswer: "x = 8",
    explanation: "2x - 5 = 11, donc 2x = 16, et finalement x = 8."
  },
  {
    question: "Quel est le développement de (a+b)²?",
    choices: ["a² + b²", "a² + 2ab + b²", "a² - b²", "(a+b)(a-b)"],
    correctAnswer: "a² + 2ab + b²",
    explanation: "(a+b)² = (a+b)(a+b) = a² + ab + ab + b² = a² + 2ab + b²"
  }
];

const creoleQuestions: AIResponse[] = [
  {
    question: "Ki jan yo di 'bonjour' an kreyòl?",
    choices: ["Bonjou", "Bonswa", "Mèsi", "Orevwa"],
    correctAnswer: "Bonjou",
    explanation: "'Bonjou' se salitasyon yo itilize pou di 'bonjour' an kreyòl ayisyen."
  },
  {
    question: "Ki pwovèb kreyòl ki signifye 'l'union fait la force'?",
    choices: ["Men anpil, chay pa lou", "Bonjou se paspo ou", "Dèyè mòn gen mòn", "Tout moun se moun"],
    correctAnswer: "Men anpil, chay pa lou",
    explanation: "'Men anpil, chay pa lou' signifye que lorsque plusieurs personnes s'unissent, le fardeau devient plus léger."
  },
  {
    question: "Ki mo kreyòl ki vle di 'école'?",
    choices: ["Lekòl", "Legliz", "Lopital", "Lakou"],
    correctAnswer: "Lekòl",
    explanation: "'Lekòl' se mo kreyòl ki koresponn ak mo fransè 'école'."
  },
  {
    question: "Ki jan yo ekri 'manger' an kreyòl?",
    choices: ["Manje", "Bwè", "Dòmi", "Pale"],
    correctAnswer: "Manje",
    explanation: "'Manje' se mo kreyòl ki vle di 'manger' an fransè."
  },
  {
    question: "Ki pwonon pèsonèl ki koresponn ak 'nous' an kreyòl?",
    choices: ["Nou", "Ou", "Yo", "Li"],
    correctAnswer: "Nou",
    explanation: "'Nou' se pwonon pèsonèl ki koresponn ak 'nous' an fransè."
  }
];

const scienceQuestions: AIResponse[] = [
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
  },
  {
    question: "Lequel des instruments suivants est le plus approprié pour mesurer la masse d'un objet?",
    choices: ["Un mètre ruban", "Une balance", "Un thermomètre", "Un chronomètre"],
    correctAnswer: "Une balance",
    explanation: "Une balance est utilisée pour mesurer la masse d'un objet, tandis qu'un mètre ruban est utilisé pour mesurer la longueur, un thermomètre pour mesurer la température et un chronomètre pour mesurer le temps."
  },
  {
    question: "La photosynthèse est un processus essentiel à la vie sur Terre. Lequel des éléments suivants est produit par la photosynthèse?",
    choices: ["Le dioxyde de carbone", "Le glucose", "L'eau", "L'oxygène"],
    correctAnswer: "L'oxygène",
    explanation: "La photosynthèse est un processus par lequel les plantes utilisent l'énergie du soleil pour convertir le dioxyde de carbone et l'eau en glucose et en oxygène. L'oxygène est un sous-produit de ce processus et est essentiel à la respiration des êtres vivants."
  }
];

const socialScienceQuestions: AIResponse[] = [
  {
    question: "Lequel de ces événements historiques a eu lieu en Haïti en 1804?",
    choices: ["La déclaration d'indépendance des États-Unis", "La révolution française", "L'indépendance d'Haïti", "La première guerre mondiale"],
    correctAnswer: "L'indépendance d'Haïti",
    explanation: "L'indépendance d'Haïti a été déclarée le 1er janvier 1804, après la victoire des esclaves révoltés contre la France. Les autres événements ne se sont pas produits en Haïti et n'ont pas eu lieu en 1804."
  },
  {
    question: "Quel est le nom du premier président d'Haïti?",
    choices: ["Toussaint Louverture", "Jean-Jacques Dessalines", "Henri Christophe", "Alexandre Pétion"],
    correctAnswer: "Jean-Jacques Dessalines",
    explanation: "Jean-Jacques Dessalines a été le premier président d'Haïti, du 1er janvier 1804 au 17 octobre 1806. Il est considéré comme l'un des principaux héros de la révolution haïtienne."
  },
  {
    question: "Quelle est la capitale du royaume de Dahomey, une monarchie importante d'Afrique de l'Ouest au XVIIIe siècle?",
    choices: ["Kumassi", "Abomey", "Ouidah", "Kano"],
    correctAnswer: "Abomey",
    explanation: "Abomey fut la capitale du royaume du Dahomey, connu pour sa puissance militaire et son commerce d'esclaves. Il était situé dans la région du Bénin moderne."
  },
  {
    question: "Quel est le nom de la monnaie nationale d'Haïti?",
    choices: ["Peso dominicain", "Dollar américain", "Gourde haïtienne", "Euro"],
    correctAnswer: "Gourde haïtienne",
    explanation: "La gourde haïtienne est la monnaie officielle d'Haïti depuis 1813. Les autres choix ne sont pas utilisés en Haïti."
  },
  {
    question: "Quel est le nom du principal fleuve d'Haïti?",
    choices: ["Rio Grande", "Orénoque", "Amazone", "Artibonite"],
    correctAnswer: "Artibonite",
    explanation: "L'Artibonite est le plus long fleuve d'Haïti, avec une longueur de 241 kilomètres. Il traverse le pays d'est en ouest et se jette dans la mer des Caraïbes."
  }
];

const englishQuestions: AIResponse[] = [
  {
    question: "Lequel de ces verbes est utilisé dans le temps présent continu pour décrire une action en cours?",
    choices: ["go", "went", "is going", "will go"],
    correctAnswer: "is going",
    explanation: "Le temps présent continu utilise la forme 'être + verbe + ing' pour décrire une action qui se passe en ce moment. La seule réponse qui correspond à cette forme est 'is going'."
  },
  {
    question: "Quel est l'article défini qui convient pour le mot 'television'?",
    choices: ["a", "an", "the", "no article"],
    correctAnswer: "the",
    explanation: "Les articles définis 'the' et 'a/an' sont utilisés pour identifier des noms spécifiques. 'The television' est correct car on parle d'une télévision spécifique, la seule dans le contexte."
  },
  {
    question: "Quel est le pluriel du mot 'child'?",
    choices: ["childs", "children", "childers", "childsens"],
    correctAnswer: "children",
    explanation: "La forme plurielle régulière du mot 'child' est 'children'. 'Childs', 'childers' et 'childsens' sont des formes incorrectes."
  },
  {
    question: "Laquelle de ces phrases est une phrase interrogative?",
    choices: ["She is reading a book.", "They went to the market.", "Do you want some coffee?", "I love learning English."],
    correctAnswer: "Do you want some coffee?",
    explanation: "Les phrases interrogatives commencent par un verbe auxiliaire ou un mot interrogatif (qui, quoi, où, quand, comment, etc.). Dans ce cas, la phrase commence par 'Do', un verbe auxiliaire."
  },
  {
    question: "Quel est le passé simple du verbe 'see'?",
    choices: ["seed", "saw", "seen", "seeing"],
    correctAnswer: "saw",
    explanation: "Le passé simple du verbe 'see' est 'saw'. 'Seed' est un nom, et 'seen' et 'seeing' sont des formes du participe passé et du participe présent, respectivement."
  }
];

const spanishQuestions: AIResponse[] = [
  {
    question: "¿Cuál es el género de la palabra \"libro\"?",
    choices: ["Masculino", "Femenino", "Neutro", "No tiene género"],
    correctAnswer: "Masculino",
    explanation: "La palabra \"libro\" termina en -o, por lo que es un sustantivo masculino."
  },
  {
    question: "Completa la frase: \"El niño ___ la pelota con su amigo.\"",
    choices: ["juega", "jugó", "jugará", "jugando"],
    correctAnswer: "juega",
    explanation: "La frase está en presente, por lo que el verbo debe estar conjugado en presente también."
  },
  {
    question: "Elige la palabra que NO es un sinónimo de \"rápido\":",
    choices: ["veloz", "ágil", "lento", "ligéro"],
    correctAnswer: "lento",
    explanation: "Las palabras \"veloz\", \"ágil\" y \"ligéro\" son sinónimos de \"rápido\", mientras que \"lento\" es su antónimo."
  },
  {
    question: "Traduce la frase al español: \"The book is on the table.\"",
    choices: ["El libro está en la mesa.", "El libro es en la mesa.", "El libro está sobre la mesa.", "El libro es sobre la mesa."],
    correctAnswer: "El libro está en la mesa.",
    explanation: "La preposición \"on\" se traduce como \"en\" cuando se refiere a la ubicación de un objeto sobre una superficie."
  },
  {
    question: "Escoge la forma correcta del verbo \"saber\" en presente del subjuntivo:",
    choices: ["sepa", "sabes", "sabe", "sabemos"],
    correctAnswer: "sepa",
    explanation: "En la tercera persona singular del presente del subjuntivo, el verbo \"saber\" se conjuga como \"sepa\"."
  }
];

const physicsQuestions: AIResponse[] = [
  {
    question: "Quelle est l'unité de mesure de la puissance électrique?",
    choices: ["Ampère", "Volt", "Watt", "Ohm"],
    correctAnswer: "Watt",
    explanation: "Le Watt (W) est l'unité de mesure de la puissance électrique, nommée d'après James Watt."
  },
  {
    question: "Quelle est la formule qui relie la tension, l'intensité et la résistance dans un circuit électrique?",
    choices: ["U = R × I", "U = R / I", "U = I / R", "U = I × I × R"],
    correctAnswer: "U = R × I",
    explanation: "La loi d'Ohm établit que la tension (U) est égale à la résistance (R) multipliée par l'intensité du courant (I): U = R × I."
  },
  {
    question: "Quel est le principe de conservation de l'énergie?",
    choices: [
      "L'énergie peut être créée mais pas détruite", 
      "L'énergie peut être détruite mais pas créée", 
      "L'énergie ne peut être ni créée ni détruite", 
      "L'énergie peut être créée et détruite"
    ],
    correctAnswer: "L'énergie ne peut être ni créée ni détruite",
    explanation: "Le principe de conservation de l'énergie stipule que l'énergie ne peut être ni créée ni détruite, elle peut seulement être transformée d'une forme à une autre."
  },
  {
    question: "Quelle est la relation entre la force (F), la masse (m) et l'accélération (a)?",
    choices: ["F = m × a", "F = m / a", "F = a / m", "F = m + a"],
    correctAnswer: "F = m × a",
    explanation: "La deuxième loi de Newton stipule que la force (F) est égale à la masse (m) multipliée par l'accélération (a): F = m × a."
  },
  {
    question: "Quel est le phénomène qui explique pourquoi la lumière change de direction lorsqu'elle passe d'un milieu à un autre?",
    choices: ["Réflexion", "Réfraction", "Diffraction", "Interférence"],
    correctAnswer: "Réfraction",
    explanation: "La réfraction est le phénomène par lequel la lumière change de direction lorsqu'elle passe d'un milieu à un autre, comme de l'air à l'eau."
  }
];
