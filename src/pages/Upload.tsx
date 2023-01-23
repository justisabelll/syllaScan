import { useSession, getSession } from "next-auth/react"
import { useRouter } from "next/router"




export default function Upload(){
    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === "loading") {
        return <p>Loading...</p>
      }
    
      if (status === "unauthenticated") {
        return (
            router.push("/")
        )
      }

    return(
        <main>
            <div className="hero min-h-screen bg-secondary-400">
            <div className="hero-content text-left ">
                <div className="max-w-md">
                <h1 className="text-4xl font-serif">Please upload a syllabus for bias detection...</h1>
                <div className="grid place-items-center">
                <input type="file" className="mt-4 file-input file-input-bordered w-full file-input-primary max-w-xs" />
                <button type="submit" className="btn btn-block mt-2">Submit</button>
                </div>
            </div>
            </div>
            </div>
            <h1></h1>
        </main>
    )
}