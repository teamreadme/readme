import { NextApiRequest, NextApiResponse, NextAuthenticatedApiRequest } from "next/types";
import { getSession } from "next-auth/react";
import { prisma } from "@/utils/prisma";
import connect from "next-connect";
import { authenticatedRequest } from "@/utils/apiValidation";
import * as Joi from "@hapi/joi";
import withJoi from "@/utils/WithJoi";
import "joi-extract-type";

const updateReadMeSchema = Joi.object({
  text: Joi.string().allow(null, "").max(100000000),
});

const searchReadMeSchema = Joi.object({
  query: Joi.string().allow(null, "").max(1000),
});

type UpdateReadMeDto = Joi.extractType<typeof updateReadMeSchema>;
type SearchReadMeDto = Joi.extractType<typeof searchReadMeSchema>;

export default connect()
  .all(authenticatedRequest)
  .get(async (req: NextAuthenticatedApiRequest, res: NextApiResponse) => {
    let readMe = await prisma.readMe.findFirst({ where: { userId: req.session.user.id } });
    if (!readMe) {
      res.status(404).end();
    } else {
      res.status(200).json(readMe);
    }
  })
  .post(withJoi({ body: searchReadMeSchema }), async (req: NextAuthenticatedApiRequest, res: NextApiResponse) => {
    const { query } = req.body as SearchReadMeDto;
    let response = await getSearchResults(query);
    res.json(response);
  })
  .patch(withJoi({ body: updateReadMeSchema }), async (req: NextAuthenticatedApiRequest, res: NextApiResponse) => {
    const { text } = req.body as UpdateReadMeDto;
    await prisma.readMe.upsert({ where: { userId: req.session.user.id }, create: { text, userId: req.session.user.id }, update: { text } });
    res.status(200).end();
  });


/**
 * Get all readMes with a name variant, or readme that match the search query
 * 
 * @param query
 * @returns A maximum of 20 READMEs
 */
export async function getSearchResults(query?: string | null) {
  return await prisma.readMe.findMany({
    where: {
      OR: query ? [
        { user: { firstName: { contains: query, mode: 'insensitive' } } },
        { user: { username: { contains: query, mode: 'insensitive' } } },
        { user: { lastName: { contains: query, mode: 'insensitive' } } },
        { text: { contains: query, mode: 'insensitive' } }
      ] : undefined
    },
    select: {
      text: true,
      id: true,
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true
        }
      }
    },
    orderBy: {
      id: 'desc'
    },
    take: 20
  });
}