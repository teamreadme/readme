import { redirectToLogin } from "@/utils/apiUtils";
import { getSession } from "next-auth/react";
import { prisma } from "@/utils/prisma";

export default function Me() {
  return <div></div>;
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return redirectToLogin();
  } else {
    const user = await prisma?.user.findFirst({ where: { id: session.user.id } });
    if (!user) {
      return redirectToLogin();
    }
    console.log(user)
    return {
      redirect: {
        destination: `/${user.username}`,
        permanent: false,
      },
    };
  }
}
