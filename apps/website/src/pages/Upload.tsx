import { useSession, getSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/router"

export default function Upload(){
    const { data: session, status } = useSession()
    const router = useRouter()

    const [file, setFile] = useState()
    const [isFilePicked, setIsFilePicked] = useState(false)

    const changeHandler = (e : React.ChangeEvent<any>) => {
        setFile(e.target.files[0])
        setIsFilePicked(true)
    }

    const handleSubmission = async () => {
        const formData : any = new FormData()
        formData.append("file", file)
        const response = await fetch("https://semantic-search-api.onrender.com/upload", {
            method: "POST",
            body: formData
        })
        const data = await response.json()
        console.log(data)
        //router.push("/results")
    
    }

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
                <input onChange={changeHandler} type="file" className="mt-4 file-input file-input-bordered w-full file-input-primary max-w-xs" />
                <button onClick={handleSubmission} type="submit" className="btn btn-block mt-2">Submit</button>
                </div>
            </div>
            </div>
            </div>
            <h1></h1>
        </main>
    )
}