import React, { useEffect, useMemo, useState } from "react";
import { prisma } from "@/utils/prisma";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next/types";
import { Descendant, Editor } from "slate";
import EditorComponent from "@/components/Editor/Editor";
import { getSession, useSession } from "next-auth/react";
import { prependOnceListener } from "process";
import classNames from "classnames";
import axios from "axios";
import Link from "next/link";

import { PersonIcon } from "@primer/octicons-react";
import Head from "next/head";
import { EMPTY_EDITOR, hashString, isEmptySlate, slateToText } from "@/utils/formatter";
import user from "./api/user";
import Layout from "@/components/Layout";
import Inspiration from "@/components/Inspiration";
import ReadMeMain from "@/components/ReadMeMain";
import ReadMeAside from "@/components/ReadMeAside";
import ReadMeTitle from "@/components/ReadMeTitle";
import ReadMeContent from "@/components/ReadMeContent";
import SuggestedTopics from "@/components/SuggestedTopics";
import TableOfContentsProps, { hasTableOfContents } from "@/components/TableOfContents";
import TableOfContents from "@/components/TableOfContents";

export default function PublicProfile({
  readMe,
  readMeUser,
  children,
}: InferGetServerSidePropsType<typeof getServerSideProps> & { children?: React.ReactNode }) {
  const { data: session } = useSession({ required: false });
  const [readMeData, setReadMeData] = useState(JSON.parse(readMe?.text ?? "[]"));
  const [refreshEditor, setRefreshEditor] = useState(0);
  const [appendSuggestion, setAppendSuggestion] = useState<Descendant[]>([]);
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

  /**
   * Get a truncated page description for the meta tags
   */
  const pageDescription = useMemo(() => {
    let text = slateToText(readMe?.text ? JSON.parse(readMe.text) : []);
    if (text.length > 255) {
      return text.substring(0, 255) + "...";
    } else {
      return text;
    }
  }, [readMe]);

  /**
   * Update the readme text
   * @param data
   */
  async function save(data: Descendant[]) {
    let stringifiedData = JSON.stringify(data);
    if (stringifiedData == readMe?.text) return;
    setReadMeData(data);
    await axios.patch("/api/readme", {
      text: stringifiedData,
    });
  }

  /**
   * Insert and save a suggestion, then refresh the editor
   * @param suggestion
   */
  async function insertSuggestion(suggestion: object[]) {
    let newReadMeData = readMeData.concat(suggestion);
    //If there's just an empty line in the text box, remove it
    if (isEmptySlate(readMeData)) {
      newReadMeData = suggestion;
    }
    setReadMeData(newReadMeData);
    await save(newReadMeData);
    setRefreshEditor(Math.random());
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
        <ReadMeTitle firstName={readMe?.user.firstName ?? ""} lastName={readMe?.user.lastName ?? ""} isUser={isUser} />
        <ReadMeContent>
          {isUser && (
            <ReadMeAside>
              <SuggestedTopics onSuggestion={insertSuggestion} />
            </ReadMeAside>
          )}

          {!isUser && hasTableOfContents(readMe?.text) && (
            <ReadMeAside>
              <TableOfContents readMe={readMe!} />
            </ReadMeAside>
          )}

          <ReadMeMain>
            <EditorComponent
              appendData={appendSuggestion}
              key={`editor-refresh-${refreshEditor}`}
              onChange={save}
              placeholder={isUser ? "Introduce yourself..." : "Coming soon..."}
              readOnly={!isUser}
              initialData={readMeData}
              className={classNames("shadow-md")}
            />
            {children}
            {isUser && (
              <>
                <Inspiration />
              </>
            )}
          </ReadMeMain>
        </ReadMeContent>
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
