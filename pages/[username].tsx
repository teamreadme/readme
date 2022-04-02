import React, { useMemo } from "react";
import { prisma } from "@/utils/prisma";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next/types";
import { Editor } from "slate";
import EditorComponent from "@/components/Editor/Editor";
import { getSession, useSession } from "next-auth/react";
import { prependOnceListener } from "process";
import classNames from "classnames";
import axios from "axios";
import Link from "next/link";
import { PersonIcon } from "@primer/octicons-react";

export default function PublicProfile({ readMe }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession({ required: false });
  const isUser = useMemo(() => readMe?.userId == session?.user.id, [readMe, session]);

  /**
   * Update the readme on save
   * @param data
   */
  async function save(data: string) {
    await axios.patch("/api/readme", {
      text: data,
    });
  }

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
            <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
              {readMe?.user.firstName} {readMe?.user.lastName}
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">README</span>
            <div className="block sm:hidden text-center mt-2">
              <Link href="/profile" passHref>
                <a title="Edit profile" className="text-gray-500">
                  Edit Profile
                </a>
              </Link>
            </div>
          </h1>
          <EditorComponent
            onChange={save}
            readOnly={!isUser}
            initialData={readMe?.text}
            className={classNames({ "shadow-none": !isUser, "shadow-md": isUser, "mt-4": isUser })}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Load a public, unauthenticated readme profile
 * @param context
 * @returns
 */
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);

  if (!context.query.username || Array.isArray(context.query.username)) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
      props: {},
    };
  }

  let username = context.query.username;
  if (username.startsWith("@")) {
    username = username.split("@")[1];
  }
  const readMe = await prisma.readMe.findFirst({
    where: { user: { username } },
    include: { user: { select: { firstName: true, lastName: true, username: true } } },
  });

  if (readMe == null) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
      props: {},
    };
  }

  return { props: { readMe, session } };
};
