import { NextApiRequest, NextApiResponse } from "next/types";
import { PrismaClient, ReadMe } from "@prisma/client";
import { getSession } from "next-auth/react";
const prisma = new PrismaClient();

interface UpdateReadMeDto {
  text: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session?.user) {
    res.status(401);
  } else {
    if (req.method === "PATCH") {
      const { text } = req.body as UpdateReadMeDto;
      await prisma.readMe.upsert({ where: { userId: session.user.id }, create: { text, userId: session.user.id }, update: { text } });
      res.status(200);
    } else if (req.method === "GET") {
      let readMe = await prisma.readMe.findFirst({ where: { userId: session.user.id } });
      if (!readMe) {
        res.status(404);
      } else {
        res.status(200).json(readMe);
      }
    }
  }
  res.end();
}
