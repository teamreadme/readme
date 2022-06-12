import { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "@/utils/prisma";
import * as Joi from "@hapi/joi";
import connect from "next-connect";
import withJoi from "@/utils/WithJoi";
import "joi-extract-type";
import { sendGridRequest } from '@/utils/sendgrid';

const registerUserSchema = Joi.object({
  email: Joi.string().required().email().max(512),
});

type RegisterUserDto = Joi.extractType<typeof registerUserSchema>;

export default connect().put(withJoi({ body: registerUserSchema }), async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body as RegisterUserDto;
  await registerUser(email);
  return res.status(200).end();
});

/**
 * Register a user with the provided email and create thir username
 * @param email
 */
export async function registerUser(email: string) {
  let existing = await prisma.user.findFirst({ where: { email } });
  if (!existing) {
    let username = await getUsername(email);

    await prisma.user.create({ data: { email, username } });
    await sendGridRequest({ url: `/v3/marketing/contacts`, method: 'PUT', body: { contacts: [{ email }] } })
  }
}

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
