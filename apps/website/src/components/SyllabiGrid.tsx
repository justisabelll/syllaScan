import Link from "next/link";
import { getSession } from "next-auth/react"
import { prisma } from "../server/db"
import { requireAuth } from "../utils/requireAuth"

interface SyllabiGridProps {
  syllabi: any[]
}


export default function SyllabiGrid({syllabi}: SyllabiGridProps) {
  return (
    <div className="m-4 overflow-hidden bg-white shadow rounded-lg w-fit">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
      {syllabi.map((syllabus) => (
        <div key={syllabus.Syllabi_ID} className="px-4 py-5 sm:px-6">
          <div className="card bg-base-100 shadow-x h-56 ">
            <div className="card-body">
              <h2 className="card-title">{syllabus.name}</h2>
              <p className="card-subtitle">{syllabus.corpus.split(' ').slice(0,3).join(' ')} ...</p>
              <div className="card-actions justify-end">
                <Link href={`/Syllabus/${syllabus.Syllabi_ID}`}>View</Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}


