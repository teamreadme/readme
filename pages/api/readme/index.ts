import { NextApiRequest, NextApiResponse, NextAuthenticatedApiRequest } from "next/types";
import { getSession } from "next-auth/react";
import { prisma } from "@/utils/prisma";
import Joi from "joi";
import connect from "next-connect";
import validate, { authenticatedRequest } from "@/utils/apiValidation";

interface UpdateReadMeDto {
  text: string;
}

const updateReadMeSchema = Joi.object({
  text: Joi.string().max(100000000),
});

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
  .patch(validate({ body: updateReadMeSchema }), async (req: NextAuthenticatedApiRequest, res: NextApiResponse) => {
    const { text } = req.body as UpdateReadMeDto;
    await prisma.readMe.upsert({ where: { userId: req.session.user.id }, create: { text, userId: req.session.user.id }, update: { text } });
    res.status(200).end();
  });
