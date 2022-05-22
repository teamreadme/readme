import Button from "@/components/Button";
import Logo from "@/components/Logo";
import LogoWithText from "@/components/LogoWithText";
import { BookOpenIcon } from "@heroicons/react/outline";
import { LockClosedIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const router = useRouter();
  const session = useSession();

  /**
   * Redirect them if they're already logged in
   */
  useEffect(() => {
    if (session) {
      router.push("/me");
    }
  }, [session]);

  /**
   * Send the magic link upon sign in
   * @param e
   */
  async function signInClicked(e: any) {
    setLoggingIn(true);
    e.preventDefault();
    await signIn("email", { email, redirect: true, callbackUrl: "/me" });
  }

  return (
    <div className="min-h-screen flex bg-gray-100 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <LogoWithText />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>
          <div>
            <Button disabled={loggingIn} onClick={signInClicked}>
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className={classNames("h-5 w-5 text-purple-500 group-hover:text-purple-400", { "text-purple-400": loggingIn })}
                  aria-hidden="true"
                />
              </span>
              Send magic link
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
