import { NextApiRequest, NextApiResponse, NextAuthenticatedApiRequest } from "next/types";
import { getSession } from "next-auth/react";
import { throwError } from "@/utils/apiUtils";
import validator from "validator";
import { prisma } from "@/utils/prisma";
import connect from "next-connect";
import { authenticatedRequest } from "@/utils/apiValidation";
import * as Joi from "@hapi/joi";
import withJoi from "@/utils/WithJoi";
import "joi-extract-type";
import { deleteSendGridContact } from '@/utils/sendgrid';
import { logSnagPublish } from '@/utils/logsnag';

const userUpdateSchema = Joi.object({
  firstName: Joi.string().max(255).min(1),
  lastName: Joi.string().max(255).min(1),
  username: Joi.string()
    .max(255)
    .not("me")
    .min(3)
    .regex(/^[a-zA-Z0-9_.]+$/),
});

type UpdateUserDto = Joi.extractType<typeof userUpdateSchema>;

export default connect()
  .all(authenticatedRequest)
  .patch(withJoi({ body: userUpdateSchema }), async (req: NextAuthenticatedApiRequest, res: NextApiResponse) => {
    const { firstName, lastName, username } = req.body as UpdateUserDto;
    const updateObj: UpdateUserDto = {};
    if (firstName) {
      updateObj.firstName = firstName;
    }
    if (lastName) {
      updateObj.lastName = lastName;
    }
    if (username) {
      let existing = await prisma.user.findFirst({ where: { username } });
      if (existing && existing.id !== req.session.user.id) {
        return throwError(res, "Username already exists");
      } else if (!existing) {
        updateObj.username = username;
      }
    }
    if (Object.keys(updateObj).length == 0) {
      return throwError(res, "Data required");
    }
    await prisma.user.update({ where: { id: req.session.user.id }, data: updateObj });
    res.status(200).end();
  })
  .delete(async (req: NextAuthenticatedApiRequest, res: NextApiResponse) => {
    const user = await prisma.user.findFirst({ select: { username: true, email: true }, where: { id: req.session.user.id } });
    if (!user?.email) {
      throw new Error("Internal server error");
    }

    //Delete the user in send grid and push to logsnag
    await Promise.all([
      deleteSendGridContact(user.email),
      logSnagPublish({
        project: "readme",
        channel: "churned-user",
        event: `User Churned`,
        description: `${user.username} just churned`,
        icon: "😭",
        notify: true
      })
    ])

    prisma.$transaction([
      prisma.readMe.deleteMany({ where: { userId: req.session.user.id } }), //deleteMany so we ignore cases where they haven't created a README yet
      prisma.session.deleteMany({ where: { userId: req.session.user.id } }),
      prisma.user.delete({ where: { id: req.session.user.id } })
    ])
    res.status(200).redirect('/');
  });
