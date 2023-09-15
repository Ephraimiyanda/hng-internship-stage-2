import "../app/globals.css"
import { AppProps } from "next/app";
import Head from 'next/head';
import Nav from "@/components/Navbar";
import Logo from "../public/tv.svg"
import tv from "../app/favicon.svg"
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/router";
import { Suspense } from "react"
import Loader from "@/components/loading";

// Define the main Next.js app component
export default function MyApp({ Component, pageProps }: AppProps) {
  // Get the Next.js router instance
  const router = useRouter();

  return (
    <Suspense fallback={<Loader/>}>
      <NextUIProvider>
        <div>
          <Head>
            {/* Define metadata for the app */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>My movie plug</title>
            <link 
              rel="icon" 
              href="/icon.svg?<generated>"
            />
          </Head>
          {/* Render the navigation component if the current path does not include "/movie" */}
          {!router.pathname.includes("/movie")&&!router.pathname.includes("/search") && <Nav />}
          {/* Render the main component */}
          <Component {...pageProps} />
        </div>
      </NextUIProvider>
    </Suspense>
  );
}
