import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, RadioGroup, Switch, Transition } from "@headlessui/react";
import { QuestionMarkCircleIcon, SearchIcon } from "@heroicons/react/solid";
import { AtSymbolIcon, BellIcon, CogIcon, CreditCardIcon, ExclamationIcon, KeyIcon, MenuIcon, UserCircleIcon, ViewGridAddIcon, XIcon } from "@heroicons/react/outline";
import { classNames } from "@/utils/formatter";
import AppLayout from "../app/AppLayout";
import axios from "axios";
import { getSession } from "next-auth/react";
import { User } from "@prisma/client";
import { Session } from "next-auth";
import { prisma } from "@/utils/prisma";

interface ProfileSettingsProps {
  user: User;
  session: Session;
}

export default function ProfileSettings(props: ProfileSettingsProps) {
  const [firstName, setFirstName] = useState(props.user.firstName || "");
  const [lastName, setLastName] = useState(props.user.lastName || "");
  const [username, setUsername] = useState(props.user.username || "");
  const [error, setError] = useState("");

  async function updateUser(updateObj: any) {
    await axios.patch("/api/user", updateObj);
  }

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
          error && setError("")
        } catch (err: any) {
          setError(err.response.data.error);
        }
      }
    })();
  }, [firstName, lastName, username]);

  return (
    <AppLayout title="Profile Settings">
      <div className="h-full">
        <main className="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
              <nav className="space-y-1">
                <a
                  key="Profile"
                  href="#"
                  className={classNames(
                    true ? "bg-gray-50 text-indigo-600 hover:bg-white" : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
                    "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
                  )}
                  aria-current={true ? "page" : undefined}
                >
                  <UserCircleIcon
                    className={classNames(true ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500", "flex-shrink-0 -ml-1 mr-3 h-6 w-6")}
                    aria-hidden="true"
                  />
                  <span className="truncate">Profile</span>
                </a>
              </nav>
            </aside>

            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
              <section aria-labelledby="payment-details-heading">
                <form action="#" method="POST">
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="bg-white py-6 px-4 sm:p-6">
                      <div>
                        <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-900">
                          Profile details
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">Update your profile information.</p>
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
                            className="mt-1 block bg-gray-200 cursor-not-allowed w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
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
    </AppLayout>
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
  console.log(user);
  return { props: { user, session } as ProfileSettingsProps };
}
