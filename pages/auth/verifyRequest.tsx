import { LockClosedIcon } from "@heroicons/react/solid";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <p className="text-gray-500 max-w-md w-full space-y-8 text-center">Check your email for a sign in link</p>
      </div>
    </div>
  );
}
