import questions from '@/data/quiz.json'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
    try {
      const question = questions.data.find(item => item.id === params.id)
  
      if (!question) {
        return new NextResponse('not found', { status: 404 })
      }
  
      const { correct_answer } = question
  
      const filteredQuestions = questions.data.filter(
        item => item.id !== params.id,
      )
      const random = Math.floor(Math.random() * filteredQuestions.length)
  
      return NextResponse.json({
        correct: correct_answer,
        random: filteredQuestions[random].id,
      })
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  