import React from "react";

interface ReadMeContainerProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function ReadMeAside(props: ReadMeContainerProps) {
  return <aside className="max-w-prose 2xl:max-w-[32ch] 2xl:ml-[-32ch] w-full z-10 isolate bg-white rounded-md p-4">{props.children}</aside>;
}
