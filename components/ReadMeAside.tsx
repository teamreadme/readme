import classNames from "classnames";
import React from "react";

interface ReadMeAsideProps {
  children: React.ReactNode | React.ReactNode[];
  position: 'left' | 'right';
  className?: string;
}

/**
 * A left-hand aside component for a README. This component will hide if the children contain no content
 * @param props 
 * @returns 
 */
export default function ReadMeAside(props: ReadMeAsideProps) {
  return (
    <aside
      className={classNames("max-w-prose empty:hidden max-h-[70vh] overflow-y-auto 2xl:max-w-[32ch] w-full z-10 isolate bg-white rounded-md p-4",
        {
          hidden: props.children == null,
          '2xl:ml-[-32ch]': props.position == 'left',
          '2xl:mr-[-32ch]': props.position == 'right',
        },
        props.className)}
    >
      {props.children}
    </aside>
  );
}
