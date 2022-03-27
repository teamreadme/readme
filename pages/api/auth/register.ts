import { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "@/utils/prisma";
import Joi from "joi";
import connect from "next-connect";
import validate from "@/utils/apiValidation";

interface RegisterUserDto {
  email: string;
}
const registerUserSchema = Joi.object({
  email: Joi.string().email().max(512),
});

export default connect()
.put(validate({ body: registerUserSchema }), async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body as RegisterUserDto;
  let existing = await prisma.user.findFirst({ where: { email } });
  if (!existing) {
    let username = await getUsername(email);

    await prisma.user.create({ data: { email, username } });
  }
  return res.status(200).end();
});

async function getUsername(email: string) {
  let username = email.split("@")[0];
  let existingUsername = await prisma.user.findFirst({ where: { username } });
  let existingCounter = 0;
  while (existingUsername != null) {
    username = email.split("@")[0] + existingCounter++;
    existingUsername = await prisma.user.findFirst({ where: { username } });
  }
  return username;
}
