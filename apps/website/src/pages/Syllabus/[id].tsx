import Syllabus from "../../components/Syllabus";
import { getSession } from "next-auth/react";
import { prisma } from "../../server/db";
import NavBar from "../../components/NavBar";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

interface SyllabusSearchProps {
  results: {
    corpus: string;
    findings: [
      {
        query: string;
        word: string;
        idx: number;
        score: number;
      }
    ];
    docScore: number;
  };
}

interface SyllabusProps {
  syllabusText: string;
  findings?: [
    {
      query: string;
      word: string;
      idx: number;
      score: number;
    }
  ];
}


export async function getStaticPaths(context: any) {
  const allIds = await prisma.syllabi.findMany({
    select: {
      Syllabi_ID: true,
    },
    where: {
      owningUserID: context.params,
    },
  });

  return {
    paths: allIds.map((id) => ({
      params: {
        id: id.Syllabi_ID.toString(),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const syllabi = await prisma.syllabi.findUnique({
    where: {
      Syllabi_ID: params.id,
    },
    select: {
      corpus: true,
      name: true,
      biasScore: true,
      Syllabi_ID: true,
      findings: true,
    },
  });
  return {
    props: {
      syllabi: syllabi,
    },
  };
}




export default function Results({ syllabi }: any) {

  const deleteSyllabus = async () => {
    try {
      const response = await fetch('/api/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          syllabusId: syllabi.Syllabi_ID,
        }),
      });

      if (response.ok) {
        alert('Syllabus deleted successfully.');
        router.push('/'); // Redirect to the main page or any other page after successful deletion
      } else {
        alert('An error occurred while deleting the syllabus.');
      }
    } catch (error) {
      alert('An error occurred while deleting the syllabus.');
    }
  };

  const router = useRouter();
  const [isSession, setSessionStatus] = useState(true);


  
  function checkForSession() {
    const session = getSession().then((session) => {
      if (session) {
        setSessionStatus(true);
      } else {
        setSessionStatus(false);
      }
    });
  }

  useEffect(() => {
    checkForSession();
  }, []);

  if (!isSession) {
    return (
      <div>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Sorry.</h1>
              <p className="py-6 text-xl font-medium">
                Your not logged in. Please log in to view this page.
              </p>
              <a href="/" className="btn-ghost btn animate-bounce text-xl">
                Log In
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <NavBar canDelete={deleteSyllabus} />
      <div className="relative isolate overflow-hidden  px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
              <Syllabus syllabusText={syllabi.corpus}  findings={syllabi.findings} />
               </div>
            </div>
          </div>
          <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <h1 className="mt-6 text-6xl font-bold text-gray-700">
              Document Score:
            </h1>
            <div className="mt-2 text-5xl font-medium"> {syllabi.biasScore}</div>
          </div>
        </div>
      </div>
    </>
  );
}

