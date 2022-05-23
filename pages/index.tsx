import Layout from "@/components/Layout";
import Logo from "@/components/Logo";
import LogoWithText from "@/components/LogoWithText";
import { BookOpenIcon, MailIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";

export default function Homepage() {
  return (
    <Layout>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <LogoWithText />
          <p className="mt-8 text-xl text-gray-500 leading-8">
            Outside of dating profiles and twitter bios, how much opportunity do you really have to communicate who you are online?
          </p>
        </div>
        <div className="mt-6 prose prose-purple prose-lg text-gray-500 mx-auto">
          <p>
            Since the mid-1970s README files have been included alongside software to provide an overview and describe the purpose of a piece of software.
            Shouldn&apos;t humans come with the same documentation? README acts as a living, breathing documentation of yourself:
          </p>
          <ul role="list">
            <li>Introduce your preferred communication methods.</li>
            <li>Let peers know flaws you&apos;re working on fixing.</li>
            <li>Learn about how people truly see themselves.</li>
          </ul>
          <p>Let the world know who you are.</p>
          <div className="text-right">
            <Link href="/auth/login" passHref>
              <button
                type="button"
                className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Login
              </button>
            </Link>
            <Link href="/auth/register" passHref>
              <button
                type="button"
                className="inline-flex ml-2 items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Register
                <MailIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
