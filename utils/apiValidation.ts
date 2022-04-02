import { NextApiResponse, NextAuthenticatedApiRequest } from "next";
import { getSession } from "next-auth/react";
import { NextHandler } from "next-connect";


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
