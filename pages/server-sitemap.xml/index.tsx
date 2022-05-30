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

    let userQuery: Prisma.UserFindManyArgs = { take: 1000, select: { username: true, id: true }, orderBy: { id: 'desc' } };
    let cursor: string | undefined;

    // Paginate through all users
    do {
        let query = { ...userQuery };
        if (cursor) {
            query = { ...query, skip: 1, cursor: { id: cursor } };
        }
        let users = await prisma.user.findMany(query);
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