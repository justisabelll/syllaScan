import { type NextPage } from "next";
import Head from "next/head";
import Hero from "../pages/components/Hero";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Syllabi Bias Detector</title>
        <meta name="description" content="Detect bias " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <main>
        <Hero/>
        </main>
      </body>
    </>
  );
};

export default Home;
