import "@/styles/globals.css";
import "@/styles/editor.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import PlausibleProvider from "next-plausible";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title key="head-title">README</title>
        <meta key="description" name="description" content="Let the world know who you are" />
        <meta key="og:title" property="og:title" content="README" />
        <meta key="og:description" property="og:description" content="Let the world know who you are"/>
        <meta key="og:image" property="og:image" content="https://readmefirst.co/meta-image.png" />
        <meta key="twitter:image" name="twitter:image" content="https://readmefirst.co/meta-image.png" />
      </Head>
      <SessionProvider session={session}>
        <PlausibleProvider domain="readmefirst.co">
          <Component {...pageProps} />
        </PlausibleProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
