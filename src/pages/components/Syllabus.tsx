
import { ReactElement } from 'react';




export default function Syllabus({syllabusText}:{ syllabusText: object }) {

    // split syllabusText by key and value
    const syllabusSectionTitles = Object.keys(syllabusText)
    const syllabusSectionText = Object.values(syllabusText)

    // display the titles and text in sections
    return (
        <div>
            {syllabusSectionTitles.map((title, index) => {
                return (
                    <div key={index}>
                        <p className="m-6 text-3xl text-primary">{title}</p>
                        <p id ="inputText" className="m-6 text-2xl text-secondary">{syllabusSectionText[index]}</p>
                        <br/>
                    </div>
                )
            }
            )}
        </div>
        
    )
}

