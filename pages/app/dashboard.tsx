import React, { useEffect, useMemo, useState } from "react";
import AppLayout from "@/pages/app/AppLayout";
import { PrismaClient, ReadMe } from "@prisma/client";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import { Session } from "next-auth";
const prisma = new PrismaClient();

interface DashboardProps {
  readMe: ReadMe | null;
  session: Session;
}

export default function Dashboard(props: DashboardProps) {
  const { data: session } = useSession({ required: true });
  const [value, setValue] = useState(props.readMe?.text ?? "");
  const rows = useMemo(() => {
    return Math.max(value.split(/\r\n|\r|\n/).length, 20);
  }, [value]);

  useEffect(() => {
    if (props.readMe?.text == value) return;
    (async () => {
      await axios.patch("/api/readme", {
        text: value,
      });
    })();
  }, [value]);

  return (
    <AppLayout>
      <div>
        <label htmlFor="readme" className="block text-sm font-medium text-gray-700">
          README
        </label>
        <div className="mt-1">
          <textarea
            rows={rows}
            name="readme"
            id="readme"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    </AppLayout>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const readMe = await prisma.readMe.findFirst({
    where: { userId: session.user?.id },
  });
  return { props: { readMe, session } };
}
