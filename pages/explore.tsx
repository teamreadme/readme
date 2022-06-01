import Layout from '@/components/Layout';
import ReadMeAside from '@/components/ReadMeAside';
import ReadMeContent from '@/components/ReadMeContent';
import ReadMeMain from '@/components/ReadMeMain';
import { stripHtml, userToName } from '@/utils/formatter';
import { EyeIcon, SearchIcon } from '@primer/octicons-react';
import axios from 'axios';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getSearchResults } from './api/readme';
import { getPopularReadMes } from './api/readme/popular';
import numeral from 'numeral';
import { Session } from '@prisma/client';


/**
 * Necessary because InferGetServerSideProps breaks when you use redirects or notFound https://github.com/vercel/next.js/issues/15913
 */
interface ExploreProps {
    results: Awaited<ReturnType<typeof getSearchResults>>,
    popular: Awaited<ReturnType<typeof getPopularReadMes>>,
    userSession: Session;
    children?: React.ReactNode
}

export default function Explore({
    results,
    userSession,
    popular
}: ExploreProps) {
    const [readMes, setReadMes] = useState(results);
    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Ignore initial load
        if (loading) {
            setLoading(false);
            return;
        }
        (async () => {
            let response = await axios.post("/api/readme", { query: search });
            setReadMes(response.data);
        })();
    }, [search])

    return <Layout authenticated={userSession != null}>
        <ReadMeContent>
            <ReadMeMain>
                <div className="max-w-prose flex flex-col 2xl:min-h-[90vh] mx-auto">
                    <div className="relative rounded-md mb-2 shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="text"
                            name="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            id="search"
                            className="focus:ring-purple-500 p-4 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                            placeholder="Search README"
                        />
                    </div>
                    <div className="space-y-2 flex-1">
                        {readMes.map((readme) => {
                            let readMe = stripHtml(readme.text)?.substring(0, 255).trim();
                            return <Link key={readme.id} href={`/${readme.user.username}`}><div className="p-4 cursor-pointer hover:shadow-md bg-white rounded-md">
                                <h2>{userToName(readme.user)}</h2>
                                <p className="text-gray-600">{readMe.length > 0 ? readMe : 'No README yet'}</p>
                            </div>
                            </Link>
                        }
                        )}
                    </div>
                </div>
            </ReadMeMain>
            <ReadMeAside className="mt-2 2xl:mt-0" position="right">
                <h2 className="text-xl mb-2">⭐ Popular READMEs</h2>
                <ul role="list">
                    {popular.map((item) => (
                        <Link key={item.user.id} href={`/${item.user.username}`}>
                            <li className="py-4 border-t-[1px] hover:bg-gray-100 transition-all cursor-pointer  p-2 flex justify-between items-center">
                                <span>
                                    {userToName(item.user)}
                                </span>
                                <div className="flex items-center space-x-1">
                                    <EyeIcon className="h-4 w-4" /><span>{numeral(item.reads).format('0[.]0a')}</span>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </ReadMeAside>
        </ReadMeContent>
    </Layout>
}




/**
 * Load a public, unauthenticated readme profile
 * @param context
 * @returns
 */
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const userSession = await getSession(context);
    if (!userSession) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            }
        };
    }
    let results = await getSearchResults();
    let popular = await getPopularReadMes();

    return { props: { results, userSession, popular } }
}