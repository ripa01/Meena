import { NextRequest, NextResponse } from 'next/server';
import quizData from '@/data/quiz.json'; // Ensure correct path

// Define the GET function for handling dynamic API routes
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params; // Destructure id from the params in context
    console.log(`Received request for quiz ID: ${id}`);

    const question = quizData.data.find((q) => q.id === id);

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    return NextResponse.json(question);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
