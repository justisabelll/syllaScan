import Syllabus from "../components/Syllabus"
import SeeBiasedWords from "../components/SeeBiasedWords"

interface fromDatabase {
    syllabusText: object,
    score: number,
    potentiallyBiasedwords: string[]
}


const fromDatabase = { 
syllabusText : {
    "Course Title" : " The Art of Silly Walk Analysis\n\n" ,
    "Instructor" : " ChatGPT\n\n" ,
    "Course Description" : " In this class, we will explore the history and techniques of the silly walk. From Monty Python to modern interpretations, we will study the various forms and styles of silly walking. Students will also have the opportunity to create and perform their own silly walk routines.\n\n" ,
    "Course Goals" : " \n Develop an understanding of the history and evolution of the silly walk\n Learn various techniques for performing a silly walk\n Create and perform a personal silly walk routine\n\n" ,
    "Textbook" : " \"The Complete Monty Python's Flying Circus: All the Words, Volume 2\" by Eric Idle and Michael Palin\n\n" ,
    "Grading" : " \n Class participation and attendance (20%)\n In-class silly walk performances (30%)\n Final silly walk routine project (50%)\n\n" ,
    "Attendance Policy" : " Regular attendance is mandatory and more than 2 absences will lower your grade. Silly walk-related excuses will be accepted.\n\n" ,
    "Office Hours" : " By appointment only, but I will always be available for a silly walk consultation.\n\n" ,
    "Note" : " This is a fictional class."
} ,
score: 3.5, 
potentiallyBiasedwords: ["word1", "word2", "silly"]}
 


export default function Results() {
    return(
        <div className="grid min-h-screen grid-cols-2 content-center mt-56 mr-12 ">
            <div className="">
                <h1 className="text-center text-6xl font-serif text-primary sticky top-0">Bias Rating:</h1>
                <h1 className="mt-6 text-center text-4xl font-serif text-accent sticky top-16">{fromDatabase.score} out of 10</h1>
                <SeeBiasedWords potentiallyBiasedWords = {fromDatabase.potentiallyBiasedwords}/>
            </div>
            <div>
            <div className="max-h-min relative max-w-fit mx-auto shadow-lg ring-3 ring-black/70 rounded-xl">

                <Syllabus syllabusText = {fromDatabase.syllabusText}/>

                </div>
            </div>
        </div>

    )
}

