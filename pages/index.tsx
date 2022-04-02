import { MailIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";

export default function Homepage() {
  return (
    <div className="relative py-16 min-h-screen flex flex-col justify-center bg-white overflow-hidden">
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        <div className="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
          <svg className="absolute top-12 left-full transform translate-x-32" width={404} height={384} fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="74b3fd99-0a6f-4271-bef2-e80eeafdf357" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
          </svg>
          <svg className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32" width={404} height={384} fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
          </svg>
          <svg className="absolute bottom-12 left-full transform translate-x-32" width={404} height={384} fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="d3eb07ae-5182-43e6-857d-35c643af9034" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
          </svg>
        </div>
      </div>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">README</span>
          </h1>
          <p className="mt-8 text-xl text-gray-500 leading-8">
            Outside of dating profiles and twitter bios, how much opportunity do you really have to communicate who you are online?
          </p>
        </div>
        <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
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
                className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </Link>
            <Link href="/auth/register" passHref>
              <button
                type="button"
                className="inline-flex ml-2 items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
                <MailIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
