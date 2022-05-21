import { NextApiRequest } from "next";
import type { DefaultUser, Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultUser & {
      id: string;
    };
  }
}

declare module "next/types" {
  interface NextAuthenticatedApiRequest extends NextApiRequest {
    session: Session;
  }
}
