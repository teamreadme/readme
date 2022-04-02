import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, RadioGroup, Switch, Transition } from "@headlessui/react";
import { QuestionMarkCircleIcon, SearchIcon } from "@heroicons/react/solid";
import {
  AtSymbolIcon,
  BellIcon,
  CogIcon,
  CreditCardIcon,
  ExclamationIcon,
  KeyIcon,
  MenuIcon,
  UserCircleIcon,
  ViewGridAddIcon,
  XIcon,
} from "@heroicons/react/outline";
import { classNames } from "@/utils/formatter";
import axios from "axios";
import { getSession } from "next-auth/react";
import { User } from "@prisma/client";
import { Session } from "next-auth";
import { prisma } from "@/utils/prisma";
import Link from "next/link";

interface ProfileSettingsProps {
  user: User;
  session: Session;
}

export default function ProfileSettings(props: ProfileSettingsProps) {
  const [firstName, setFirstName] = useState(props.user.firstName || "");
  const [lastName, setLastName] = useState(props.user.lastName || "");
  const [username, setUsername] = useState(props.user.username || "");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      let updateObj: any = {};
      if (firstName.length && firstName != props.user.firstName) {
        updateObj.firstName = firstName;
      }
      if (lastName.length && lastName != props.user.lastName) {
        updateObj.lastName = lastName;
      }
      if (username.length && username != props.user.username) {
        updateObj.username = username;
      }
      if (Object.keys(updateObj).length) {
        try {
          await axios.patch("/api/user", updateObj);
          error && setError("");
        } catch (err: any) {
          setError(err.response.data.error);
        }
      }
    })();
  }, [firstName, lastName, username]);

  return (
    <div className="h-full min-h-screen bg-gray-100  flex flex-col justify-center">
      <div className="hidden lg:block z-0 lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        <div className="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
          <svg className="absolute top-12 left-full transform translate-x-32" width={404} height={384} fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="74b3fd99-0a6f-4271-bef2-e80eeafdf357" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                <rect x={0} y={0} width={4} height={4} className="text-gray-300" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
          </svg>
          <svg className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32" width={404} height={384} fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                <rect x={0} y={0} width={4} height={4} className="text-gray-300" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
          </svg>
          <svg className="absolute bottom-12 left-full transform translate-x-32" width={404} height={384} fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="d3eb07ae-5182-43e6-857d-35c643af9034" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                <rect x={0} y={0} width={4} height={4} className="text-gray-300" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
          </svg>
        </div>
      </div>
      <main className="max-w-prose w-full z-10 isolate mx-auto ">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-12">
            <section aria-labelledby="payment-details-heading">
              <form action="#" method="POST">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="bg-white py-6 px-4 sm:p-6">
                    <div className="flex ">
                      <div className="flex-1">
                        <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-900">
                          Profile details
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">Update your profile information.</p>
                      </div>
                      <div>
                        <Link href="/me" passHref>
                          <a>
                            <div className="text-gray-500 hover:underline">Go to README</div>
                          </a>
                        </Link>
                      </div>
                    </div>
                    {error && (
                      <div className="bg-red-50 border-l-4 mt-2 border-red-400 p-4">
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
                    <div className="mt-6 grid grid-cols-4 gap-6">
                      <div className="col-span-4 sm:col-span-2">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          First name
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          id="first-name"
                          autoComplete="cc-given-name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-4 sm:col-span-2">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          id="last-name"
                          autoComplete="cc-family-name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-4 sm:col-span-2">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                          Username
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <AtSymbolIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </div>
                          <input
                            type="username"
                            name="username"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                            placeholder={props.user.email?.split("@")[0]}
                          />
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <input
                          type="text"
                          disabled={true}
                          value={props.user.email!}
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 block  bg-gray-200 cursor-not-allowed w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findFirst({
    where: { id: session.user?.id },
    select: {
      id: true,
      firstName: true,
      username: true,
      email: true,
      lastName: true,
    },
  });
  return { props: { user, session } as ProfileSettingsProps };
}
