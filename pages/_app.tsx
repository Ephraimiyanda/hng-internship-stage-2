import "../app/globals.css"
import { AppProps } from "next/app";
import Head from 'next/head';
import Nav from "@/components/Navbar";
import Logo from "../public/tv.svg"
import tv from "../app/favicon.svg"
import {NextUIProvider} from "@nextui-org/react";

export default function MyApp({ Component, pageProps }:AppProps) {

    return (
     <NextUIProvider>
      <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My movie plug</title>
        <link 
        rel="icon" 
        href="../app/icon.svg"
        />
      </Head> 
      
      <Nav/>
    <Component {...pageProps} />
    
  </div>
  </NextUIProvider>
    );
  }