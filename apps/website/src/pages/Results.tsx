import SeeBiasedWords from "../components/SeeBiasedWords"
import example_response from "../example_response.json"
import Syllabus from "../components/Syllabus"

interface SyllabusSearchProps {
    results: {
        corpus: string,
        findings:[
            {
                "query": string,
                "word": string,
                "idx": number,
                "score": number
            }
        ],
        docScore: number
    }

}

const testJSON = example_response; // replace with the actual JSON response from the API

export default function Results() {
    return(
        <div className="relative isolate overflow-hidden  px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
              <Syllabus syllabusText = {testJSON.results.corpus}/>
              </div>
            </div>
          </div>
          <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <h1 className="mt-6 text-6xl font-bold text-gray-700">
              Document Score: 
              </h1>
              <div className="mt-2 text-2xl">
              {testJSON.results.docScore}
                </div>

          </div> 
        </div>
      </div>

    )
}

