import questions from '@/data/quiz.json'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
      const random = Math.floor(Math.random() * questions.data.length)
      return NextResponse.json({
        randomQuestion: questions.data[random].id,
      })
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }