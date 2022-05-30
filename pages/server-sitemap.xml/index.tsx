import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { prisma } from "@/utils/prisma";
import { Prisma } from '@prisma/client';

/**
 * Paginate through all users and generate a sitemap with their profiles
 * When we get to a large amount of users we'll likely need a more performant method for this
 * @param ctx
 * @returns 
 */
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const url = process.env.SITE_URL || 'https://readmefirst.co';
    let usernames = [];
    let userQuery: Prisma.UserFindManyArgs = { take: 1, select: { username: true, id: true }, orderBy: { id: 'desc' } };
    // https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination
    // Initiate the first query
    let users = await prisma.user.findMany(userQuery)
    let cursor: string = users[users.length - 1]?.id;

    // Paginate through all users
    do {
        let users = await prisma.user.findMany({ ...userQuery, skip: 1, cursor: { id: cursor } });
        usernames.push(...users.map((user) => user.username));
        cursor = users[users.length - 1]?.id
    } while (cursor != null);

    const fields = usernames.map((username) => ({
        loc: `${url}/${username}`,
        lastmod: new Date().toISOString(),
    }))

    return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() { }