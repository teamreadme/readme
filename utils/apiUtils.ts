import { NextApiResponse } from "next";

export function throwError(res: NextApiResponse, message: string) {
  res.status(422).json({ error: message });
}

export function redirectToLogin() {
    return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
        props: {},
      };
}