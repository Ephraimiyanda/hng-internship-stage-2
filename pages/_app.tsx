import "../app/globals.css"
import { AppProps } from "next/app";
import Head from 'next/head';
import Nav from "@/components/Navbar";
import Logo from "../public/tv.svg"
import tv from "../app/favicon.svg"
import {NextUIProvider} from "@nextui-org/react";
import { useRouter } from "next/router";
import {Suspense} from "react"
import Loader from "@/components/loading";
export default function MyApp({ Component, pageProps }:AppProps) {
const router =useRouter()
    return (
    <Suspense fallback={<Loader/>}>

    <NextUIProvider>
      <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My movie plug</title>
        <link 
        rel="icon" 
        href="/icon.svg?<generated>"
        />
      </Head> 
    {!router.pathname.includes("/movie")&&<Nav/>}
    
    <Component {...pageProps} />
  </div>
  </NextUIProvider>
    </Suspense>
    );
  }