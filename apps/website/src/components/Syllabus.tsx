import { getSession } from 'next-auth/react'
import { requireAuth } from '../utils/requireAuth'

export default function Syllabus({syllabusText}:{ syllabusText: string }) {
    return (
    <pre className="lg:col-span-2 lg:col-start-1 lg:row-start-2  whitespace-pre-wrap lg:mx-auto t lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-4">
    <div className="lg:pr-4">
      <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
        {syllabusText}
      </div>
    </div>
  </pre>
  )
}