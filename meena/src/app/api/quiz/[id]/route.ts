import { NextRequest, NextResponse } from "next/server";
import quizData from "@/data/quiz.json"; // Ensure correct path

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    console.log(`Received request for quiz ID: ${id}`);

    const question = quizData.data.find((q) => q.id === id);

    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    return NextResponse.json(question);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
