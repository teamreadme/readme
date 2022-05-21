import classNames from "classnames";
import React from "react";

interface ReadMeAsideProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function ReadMeAside(props: ReadMeAsideProps) {
  return (
    <aside
      className={classNames("max-w-prose 2xl:max-w-[32ch] 2xl:ml-[-32ch] w-full z-10 isolate bg-white rounded-md p-4", { hidden: props.children == null })}
    >
      {props.children}
    </aside>
  );
}
