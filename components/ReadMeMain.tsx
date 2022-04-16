import React from "react";

interface ReadMeMainProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function ReadMeMain(props: ReadMeMainProps) {
 return <main className="max-w-prose w-full z-10 isolate">{props.children}</main>;
}
