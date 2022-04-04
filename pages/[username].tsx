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
import Head from "next/head";
import { slateToText } from "@/utils/formatter";
import user from "./api/user";
import Layout from "@/components/Layout";
import Inspiration from "@/components/Inspiration";

export default function PublicProfile({ readMe, readMeUser,children }: InferGetServerSidePropsType<typeof getServerSideProps>&{children?: React.ReactNode}) {
  const { data: session } = useSession({ required: false });
  const isUser = useMemo(() => readMe?.userId == session?.user.id || readMeUser?.id == session?.user.id, [readMe, readMeUser, session]);
  const pageTitle = useMemo(() => {
    let out = "README | ";
    if (readMeUser?.firstName) {
      out += readMeUser.firstName;
      if (readMeUser.lastName) {
        out += " " + readMeUser?.lastName;
      }
    } else {
      out += readMeUser?.username;
    }
    return out;
  }, [readMe?.user]);

  const pageDescription = useMemo(() => {
    let text = slateToText(readMe?.text ? JSON.parse(readMe.text) : []);
    if (text.length > 255) {
      return text.substring(0, 255) + "...";
    } else {
      return text;
    }
  }, [readMe]);

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
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta property="og:description" content={pageDescription} key="ogdesc" />

        <title>{pageTitle}</title>
      </Head>
      <Layout>
        <h1>
          <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
            {readMe?.user.firstName} {readMe?.user.lastName}
          </span>
          <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">README</span>
          {isUser && (
            <div className="block sm:hidden text-center mt-2">
              <Link href="/profile" passHref>
                <a title="Edit profile" className="text-gray-500">
                  Edit Profile
                </a>
              </Link>
            </div>
          )}
        </h1>
        <EditorComponent onChange={save} readOnly={!isUser} initialData={readMe?.text} className={classNames("shadow-md")} />
        {children}
        {isUser && (
          <>
            <Inspiration />
          </>
        )}
      </Layout>
    </>
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
  const user = await prisma.user.findFirst({
    where: { username: context.query.username },
    select: { username: true, firstName: true, lastName: true, id: true },
  });

  if (user == null) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
      props: {},
    };
  }
  const readMe = await prisma.readMe.findFirst({
    where: { user: { username } },
    include: { user: { select: { firstName: true, lastName: true, username: true } } },
  });
  return { props: { readMe, session, readMeUser: user } };
};
