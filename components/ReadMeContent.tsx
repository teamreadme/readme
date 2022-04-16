import React from "react";

interface ReadMeContentProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function ReadMeContent(props: ReadMeContentProps) {
  return <div className="flex flex-col items-center 2xl:items-start space-y-4 2xl:space-y-0 2xl:flex-row justify-center mt-4 flex-shrink-0 2xl:space-x-4">{props.children}</div>;
}
