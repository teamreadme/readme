import { NextApiRequest, NextApiResponse, NextAuthenticatedApiRequest } from "next/types";
import { getSession } from "next-auth/react";
import { prisma } from "@/utils/prisma";
import connect from "next-connect";
import { authenticatedRequest } from "@/utils/apiValidation";
import * as Joi from "@hapi/joi";
import withJoi from "@/utils/WithJoi";
import "joi-extract-type";

export default connect()
    .all(authenticatedRequest)
    .get(async (req: NextAuthenticatedApiRequest, res: NextApiResponse) => {
        let top10ReadMes = await getPopularReadMes()
        res.json(top10ReadMes);
    });


/**
 * Get up to 10 READMEs with a view count higher than 10
 * Ordered by most views
 * @returns 
 */
export async function getPopularReadMes() {
    return await prisma.readMe.findMany({
        take: 10,
        select: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    username: true
                }
            },
            reads: true
        },
        where: {
            reads: {
                gt: 10
            }
        },
        orderBy: {
            reads: 'desc'
        }
    });
}