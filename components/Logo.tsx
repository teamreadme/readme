import { BookOpenIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React from "react";

interface LogoProps {
  className?: string;
}

export default function Logo(props: LogoProps) {
  return <BookOpenIcon className={classNames("text-purple-600", props.className)} />;
}
