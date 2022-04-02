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
  });
