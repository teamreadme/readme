import { ReadMe } from "@prisma/client";
import Link from "next/link";
import React from "react";
import LogoWithText from "./LogoWithText";

interface ReadMeTitleProps {
  name: string;
  isUser: boolean;
}

export default function ReadMeTitle(props: ReadMeTitleProps) {
  return (
    <>
      <span className="block text-2xl text-center text-purple-600 font-semibold tracking-wide uppercase">
        {props.name}
      </span>
      {props.isUser && (
        <div className="block sm:hidden text-center mt-2">
          <Link href="/profile" passHref>
            <a title="Edit profile" className="text-gray-500">
              Edit Profile
            </a>
          </Link>
        </div>
      )}
    </>
  );
}
