import LogoWithText from "@/components/LogoWithText";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>Magic Link | README</title>
      </Head>
      <div className="min-h-screen bg-gray-100  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <LogoWithText />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          </div>
          <p className="text-gray-500 max-w-md w-full space-y-8 text-center">Check your email for a sign in link</p>
        </div>
      </div>
    </>
  );
}
