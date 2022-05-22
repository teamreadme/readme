import Button from "@/components/Button";
import LogoWithText from "@/components/LogoWithText";
import { ExclamationIcon, LockClosedIcon } from "@heroicons/react/solid";
import axios from "axios";
import classNames from "classnames";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);
  const router = useRouter();
  async function signInClicked(e: any) {
    e.preventDefault();
    try {
      setRegistering(true);
      await axios.put("/api/auth/register", { email });
      await signIn("email", { email, redirect: false, callbackUrl: "/me" });
      router.push("/auth/verifyRequest");
    } catch (err: any) {
      if (err.response.data) {
        setError(err.response.data.error);
      }
    } finally {
      setRegistering(false);
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <LogoWithText />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register an account</h2>
        </div>
        <div>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
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
            <Button disabled={registering} onClick={signInClicked}>
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className={classNames("h-5 w-5 text-purple-500 group-hover:text-purple-400", { "text-purple-400": registering })}
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
