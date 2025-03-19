'use client'

import { useEffect, useState } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { FiRepeat } from 'react-icons/fi'
import { MdNearbyError } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa'

interface AnswerProps {
  answers: string[]
  questionId: string
}

interface AnswerData {
  correct: string
  random?: string
}

export const Answer = ({ answers, questionId }: AnswerProps) => {
  const [selected, setSeleceted] = useState<string | null>(null)
  const [data, setData] = useState<AnswerData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    let subscribed = true
    if (selected) {
      setLoading(true)
      fetch(`/api/quiz/answer/${questionId}`)
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
      <ul className="grid grid-cols-1 gap-4 ">
  {answers.map(item => {
    const isLoading = selected === item && loading;
    const isWrong = selected === item && data && data?.correct !== selected;
    const isCorrect = data?.correct === item;

    return (
      <li key={item}>
        <button
          disabled={data !== null || loading}
          onClick={() => setSeleceted(item)}
          className={cn(
            'relative p-4 rounded-lg w-full flex justify-center items-center text-sm font-semibold disabled:cursor-not-allowed transition-all',
            isLoading && 'animate-pulse bg-gray-500 opacity-50',
            isWrong ? 'bg-red-300 text-black' : 'bg-gray-100 text-black',
            isCorrect && 'outline outline-4 outline-green-500',
          )}
        >
          {item}
          
          {/* Display checkmark if correct */}
          {isCorrect && (
            <span className="absolute top-5 right-2 text-green-500">
              <FaCheck />
            </span>
          )}

          {/* Display error icon if wrong */}
          {isWrong && (
            <span className="absolute top-5 right-2 text-red-500">
              <MdNearbyError />
            </span>
          )}

          {/* Add a loader animation if it's loading */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
              <div className="w-6 h-6 border-4 border-t-4 border-white rounded-full animate-spin"></div>
            </div>
          )}
        </button>
      </li>
    );
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
