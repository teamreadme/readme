import classNames from "classnames";
import React from "react";

interface ReadMeMainProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

export default function ReadMeMain(props: ReadMeMainProps) {
  return <main className={classNames("max-w-prose ml-4 mr-4 w-full z-10 isolate", props.className)}>{props.children}</main>;
}
