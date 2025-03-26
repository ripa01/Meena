import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { Answer } from "@/components/Answer";

interface Question {
  id: string;
  title: string;
  answers: string[];
  correct_answer: string;
}

// Fetch Quiz Question
async function getQuizQuestion(id: string): Promise<Question | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/quiz/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching quiz question:", error);
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const question = await getQuizQuestion(params.id);

  if (!question) {
    return notFound(); // Shows a 404 page if question is not found
  }

  return (
    <Container as="main" className="flex flex-col gap-5 py-5">
        
      <h1 className="text-lg font-semibold">{question.title}</h1>
      <Answer answers={question.answers} questionId={params.id} />
      

    </Container>
  );
}
