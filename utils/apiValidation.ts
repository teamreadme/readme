import { ValidationError } from "joi";
import { NextApiRequest, NextApiResponse, NextAuthenticatedApiRequest } from "next";
import { getSession } from "next-auth/react";
import { NextHandler } from "next-connect";
import withJoi from "next-joi";

export default withJoi({
  onValidationError: (_, res, error: ValidationError) => {
    let errorMessage = error.details.map(({ message }) => message).join(", ");
    console.log(errorMessage)
    res.status(422).json({ error: errorMessage });
  },
});

/**
 * Authenticates a request and attaches the session object
 * @param req
 * @param res
 * @param next
 * @returns
 */
export async function authenticatedRequest(req: NextAuthenticatedApiRequest, res: NextApiResponse, next: NextHandler) {
  const session = await getSession({ req });
  if (!session?.user) {
    res.status(401).end();
    return;
  } else {
    req.session = session;
    next();
  }
}
