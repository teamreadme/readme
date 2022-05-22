import "@/styles/globals.css";
import "@/styles/editor.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
      <title key="head-title">README</title>
      <meta name="description" content="Let the world know who you are" />
        <meta property="og:title" content="README" key="ogtitle" />
        <meta property="og:description" content="Let the world know who you are" key="ogdesc" />
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
