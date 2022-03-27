import { NextApiRequest, NextApiResponse, NextAuthenticatedApiRequest } from "next/types";
import { getSession } from "next-auth/react";
import { throwError } from "@/utils/apiUtils";
import validator from "validator";
import { prisma } from "@/utils/prisma";
import Joi from "joi";
import connect from "next-connect";
import validate, { authenticatedRequest } from "@/utils/apiValidation";

const userUpdateSchema = Joi.object({
  firstName: Joi.string().max(255).min(1),
  lastName: Joi.string().max(255).min(1),
  username: Joi.string()
    .max(255)
    .min(3)
    .regex(/^[a-zA-Z0-9_.]+$/),
});

interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  username?: string;
}

export default connect()
  .all(authenticatedRequest)
  .patch(validate({ body: userUpdateSchema }), async (req: NextAuthenticatedApiRequest, res: NextApiResponse) => {
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
      if (existing) {
        return throwError(res, "Username already exists");
      }
      updateObj.username = username;
    }
    if (Object.keys(updateObj).length == 0) {
      return throwError(res, "Data required");
    }
    await prisma.user.update({ where: { id: req.session.user.id }, data: updateObj });
    res.status(200).end();
  });
