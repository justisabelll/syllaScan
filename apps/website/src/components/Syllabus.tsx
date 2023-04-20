import React from 'react';

interface SyllabusProps {
  syllabusText: string;
  findings: [
    {
      query: string;
      word: string;
      idx: number;
      score: number;
    }
  ];
}

export default function Syllabus({ syllabusText, findings }: SyllabusProps) {

  // for all the words at the idx add a span with the class that highlights the word

  const textArr = syllabusText.split(' ');
  textArr.forEach((word, idx) => {
    findings.forEach((finding) => {
      if (finding.idx === idx) {
        textArr[idx] = `<span class="bg-yellow-200 rounded-full">${word}</span>`;
      }
    });
  });

  console.log(findings)



  return (
    <pre className="lg:col-span-2 lg:col-start-1 lg:row-start-2 whitespace-pre-wrap lg:mx-auto t lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-4">
      <div className="lg:pr-4">
        <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
          <div
            dangerouslySetInnerHTML={{
              __html: textArr.join(' '),
            }}
          />
            
        </div>
      </div>
    </pre>
  );
}
