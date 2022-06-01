import Logo from "@/components/Logo";
import LogoWithText from "@/components/LogoWithText";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen h-full pt-16 pb-12 flex flex-col bg-gray-100">
      <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0 flex justify-center">
          <Link href="/" passHref>
            <a className="inline-flex">
              <span className="sr-only">README</span>
              <LogoWithText noLogoMargin={true} className="h-12 w-auto" />
            </a>
          </Link>
        </div>
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">404 error</p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Page not found.</h1>
            <p className="mt-2 text-base text-gray-500">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
            <div className="mt-6">
              <Link passHref={true} href="/">
                <a className="text-base font-medium text-purple-600 hover:text-purple-500">
                  Go back home<span aria-hidden="true"> &rarr;</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-center space-x-4">
          <a href="mailto:support@readmefirst.co" className="text-sm font-medium text-gray-500 hover:text-gray-600">
            Contact Support
          </a>
          <span className="inline-block border-l border-gray-300" aria-hidden="true" />
          <a href="https://twitter.com/teamreadme" rel="noreferrer" target="_blank" className="text-sm font-medium text-gray-500 hover:text-gray-600">
            Twitter
          </a>
        </nav>
      </footer>
    </div>
  );
}
