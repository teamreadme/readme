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

type UpdateReadMeDto = Joi.extractType<typeof updateReadMeSchema>;

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
  .patch(withJoi({ body: updateReadMeSchema }), async (req: NextAuthenticatedApiRequest, res: NextApiResponse) => {
    const { text } = req.body as UpdateReadMeDto;
    await prisma.readMe.upsert({ where: { userId: req.session.user.id }, create: { text, userId: req.session.user.id }, update: { text } });
    res.status(200).end();
  });
