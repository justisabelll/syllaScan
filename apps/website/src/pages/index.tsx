import { type NextPage } from "next";
import { redirect } from "next/dist/server/api-utils";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Hero from "../components/Hero";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Syllabi Bias Detector</title>
        <meta name="description" content="Detect bias " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main>
        <Hero/>
        </main>
    </>
  );
};

export default Home;

export const getServerSideProps = async (context : any) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/Dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  }
};
