import React, { useMemo, useState } from "react";
import { prisma } from "@/utils/prisma";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next/types";
import EditorComponent from "@/components/Editor/Editor";
import { getSession, useSession } from "next-auth/react";
import classNames from "classnames";
import axios from "axios";

import Head from "next/head";
import { slateToText, stripHtml } from "@/utils/formatter";
import Layout from "@/components/Layout";
import Inspiration from "@/components/Inspiration";
import ReadMeMain from "@/components/ReadMeMain";
import ReadMeAside from "@/components/ReadMeAside";
import ReadMeTitle from "@/components/ReadMeTitle";
import ReadMeContent from "@/components/ReadMeContent";
import SuggestedTopics from "@/components/SuggestedTopics";
import { hasTableOfContents } from "@/components/TableOfContents";
import TableOfContents from "@/components/TableOfContents";
import NoSSR from "@/components/NoSSR";
import user from "./api/user";

export default function PublicProfile({
  readMe,
  readMeUser,
  children,
}: InferGetServerSidePropsType<typeof getServerSideProps> & { children?: React.ReactNode }) {
  const { data: session } = useSession({ required: false });
  const [readMeData, setReadMeData] = useState(getReadMeData());
  const [refreshEditor, setRefreshEditor] = useState(0);
  const [appendSuggestion, setAppendSuggestion] = useState<string>();
  const [editorScrollTo, setEditorScrollTo] = useState<string>();
  const userDisplayName = useMemo(() => {
    let out = '';
    if (readMeUser?.firstName) {
      out += readMeUser.firstName;
      if (readMeUser.lastName) {
        out += " " + readMeUser?.lastName;
      }
    } else {
      out += readMeUser?.username;
    }
    return out;
  }, [readMeUser])
  const pageTitle = useMemo(() => `README | ${userDisplayName}`, [readMe?.user]);
  const isUser = useMemo(() => readMe?.userId == session?.user.id || readMeUser?.id == session?.user.id, [readMe, readMeUser, session]);

  /**
   * We originally used Slate which stored data in a JSON format
   * Use this to check if the data is in that saved format. If so, just take the raw text
   * none of our users had used the Slate formatting heavily yet.
   * TODO: This can be removed by July 2022
   * @returns
   */
  function getReadMeData() {
    try {
      let slate = JSON.parse(readMe?.text ?? '');
      return slateToText(slate);
    } catch (err) {
      return readMe?.text ?? ''
    }
  }

  /**
   * Get a truncated page description for the meta tags
   */
  const pageDescription = useMemo(() => {
    let text = stripHtml(readMeData);
    if (readMeData.length > 255) {
      return text.substring(0, 255) + "...";
    } else {
      return text;
    }
  }, [readMe]);

  /**
   * Update the readme text
   * @param data
   */
  async function save(data: string) {
    if (data == readMe?.text) return;
    setReadMeData(data);
    await axios.patch("/api/readme", {
      text: data,
    });
  }

  /**
   * Insert and save a suggestion, then refresh the editor
   * @param suggestion
   */
  async function insertSuggestion(suggestion: string) {
    setAppendSuggestion(suggestion);
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
        <ReadMeTitle name={userDisplayName} isUser={isUser} />
        <ReadMeContent>
          {isUser && (
            <ReadMeAside>
              <SuggestedTopics onSuggestion={insertSuggestion} />
            </ReadMeAside>
          )}
          <NoSSR>
            {!isUser && (
              <ReadMeAside>
                <TableOfContents onClick={setEditorScrollTo} readMe={readMe!} />
              </ReadMeAside>
            )}
          </NoSSR>
          <ReadMeMain>
            <EditorComponent
              appendData={appendSuggestion}
              onChange={save}
              scrollTo={editorScrollTo}
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
