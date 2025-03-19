import { Answer } from "@/components/Answer";
import Container from "@/components/Container";

// Define the structure of the quiz question
interface QuizQuestion {
  id: string;
  title: string;
  answers: string[];
  correct_answer: string;
}

// Fetch function to get a quiz question by ID
async function getQuizQuestion(id: string): Promise<{ question: QuizQuestion }> {
  const response = await fetch(`http://localhost:3000/quiz/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

// Page component
interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { question } = await getQuizQuestion(params.id);

  return (
    <Container as="main" className="flex flex-col gap-5 py-5">
      <h1 className="text-lg font-semibold">{question.title}</h1>
      <Answer answers={question.answers} questionId={params.id} />
    </Container>
  );
}
