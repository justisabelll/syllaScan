import { useSession, getSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/router"
import { requireAuth } from "../utils/requireAuth"
import NavBar from "../components/NavBar"
import { useForm } from "react-hook-form"

interface syllabiPOST {
    syllabus: File
    owningUserID: string
}


export default function Upload(){
    const { register, handleSubmit } = useForm()
    const [uploaded, setUploaded] = useState(false)
    const { data: session, status } = useSession()


    const handleSubmission = async ( data : any) => {
        setUploaded(true)
        // const newSyllabus: syllabiPOST = {
        //     syllabus: data.syllabus[0],
        //     owningUserID: session.user.id
        // }

        const formData = new FormData()
        formData.append("syllabus_file", data.syllabus[0])
        formData.append("owner_ID", session?.user?.id || "")

        await fetch("https://semantic-search-api.onrender.com/upload", {
            method: "POST",
            body: formData,

        })
    }




    // tell users that they can naviagte away from the page and that the file is processing and will be avaible from the dashboard soon
      if (uploaded) {
            return (
                <>
                <NavBar/>
                <div className="hero min-h-screen bg-secondary-400">
                <div className="hero-content">
                    <div className="max-w-md">
                    <h1 className="text-2xl font-medium font-serif">Your syllabus is currently processing and the results will be avaiable soon in the dashboard.</h1>
                    <div className="flex w-min flex-row gap-2">
                    <a href="/dashboard" className="btn btn-block mt-2">Back to Dashboard</a>
                    <button onClick={() => setUploaded(false)} className="btn btn-block mt-2">Upload Another Syllabus</button>
                    </div>
                </div>
                </div>
                </div>
                </>
            )
        }
        else {
    return(
        <>
        <NavBar/>
        <main>
            <div className="hero min-h-screen bg-secondary-400">
            <div className="hero-content text-left ">
                <div className="max-w-md">
                <h1 className="text-4xl font-serif">Please upload a syllabus for bias detection...</h1>
                <div className="grid place-items-center">
                <form onSubmit={handleSubmit(handleSubmission)} >
                <input {...register("syllabus")} required  type="file" className="mt-4 file-input file-input-bordered w-full file-input-primary max-w-xs" />
                <button type="submit" className="btn btn-block mt-2">Submit</button>
                </form>
                </div>
            </div>
            </div>
            </div>
        </main>
        </>
    )
}
}

export async function getServerSideProps(context: any){
    return requireAuth(context, async (session: any) => {
        session = await getSession(context)
        return {
            props: {
                session
            }
        }
    })
}

