import { NextApiRequest, NextApiResponse } from "next/types";
import { PrismaClient, ReadMe } from "@prisma/client";
import { getSession } from "next-auth/react";
const prisma = new PrismaClient();

interface RegisterUserDto {
  email: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { email } = req.body as RegisterUserDto;
    let existing = await prisma.user.findFirst({ where: { email } });
    if (existing) {
      res.status(422).json({ error: "User already exists" });
      res.end();
      return;
    }
    await prisma.user.create({ data: { email } });
    return res.status(200).redirect("/auth/verifyRequest").end();
  }
}
