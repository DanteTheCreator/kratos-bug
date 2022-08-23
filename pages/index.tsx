import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router  = useRouter();
  useEffect(()=>{
    router.push("/auth/login")
  },[router])
  return (
    <>
      <Head>
        <title>Home | Arcton</title>
      </Head>

      <main className="h-100">
        <div className="d-flex align-items-center justify-content-center h-100 w-100">
          <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
          <span className="">Loading...</span>
        </div>
      </main>
    </>
  );
};

export default Home;
