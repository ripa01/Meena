'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FiRepeat } from 'react-icons/fi'
import { MdNearbyError } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa'

// Define types for the props
interface AnswerProps {
  answers: string[];
  questionId: string;
}

// Define the expected structure of the API response
interface AnswerData {
  correct: string;
  random?: string;
}

export const Answer = ({ answers, questionId }: AnswerProps) => {
  // State variables with types
  const [selected, setSeleceted] = useState<string | null>(null)
  const [data, setData] = useState<AnswerData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  // Fetching logic
  useEffect(() => {
    let subscribed = true
    if (selected) {
      setLoading(true)
      fetch(`http://localhost:3000/api/quiz/answer/${questionId}`)
        .then(res => res.json())
        .then((data: AnswerData) => {
          setLoading(false)
          if (subscribed) {
            setData(data)
          }
        })
    }

    return () => {
      console.log('cancelled!')
      subscribed = false
    }
  }, [questionId, selected])

  return (
    <>
      <ul className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {answers.map(item => {
          const isLoading = selected === item && loading
          const isWrong =
            selected === item && data && data?.correct !== selected
          const isCorrect = data?.correct === item

          return (
            <li key={item}>
              <button
                disabled={data !== null || loading}
                onClick={() => setSeleceted(item)}
                className={
                  'p-2 rounded-md items-center justify-between w-full flex text-sm font-semibold disabled:cursor-not-allowed transition-all ' +
                  (isLoading ? 'animate-pulse ' : '') +
                  (isWrong ? 'bg-red-700 ' : 'bg-slate-800 ') +
                  (isCorrect ? 'outline text-green-500 ' : '')
                }
              >
                {item}
                {isCorrect && <FaCheck />}
                {isWrong && <MdNearbyError />}
              </button>
            </li>
          )
        })}
      </ul>
      {data?.random && (
        <Link
          href={`/quiz/${data.random}`}
          className="flex items-center gap-1 text-blue-400"
        >
          <FiRepeat className="mt-1" />
          Do it again
        </Link>
      )}
    </>
  )
}
