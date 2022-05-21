import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "@/utils/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verifyRequest", // (used for check email message)
    newUser: "/me", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
    // NextAuth has a built-in function where if a user signs in but doesn't have an account,
    // it'll send them a registration email. However, we have a custom API for registration that we want to use
    // so deny any requests on here for new users.
    async signIn({ user }) {
      if (user.id === user.email) return `/auth/error?error=${encodeURIComponent("Please register an account first")}`;
      return true;
    }
  },
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      server: {
        host: process.env.MAILGUN_SMTP_SERVER,
        port: process.env.MAILGUN_PORT,
        auth: {
          user: process.env.MAILGUN_SMTP_LOGIN,
          pass: process.env.MAILGUN_SMTP_PASSWORD,
        },
      },
    }),
  ],
  secret: process.env.SECRET,
});
