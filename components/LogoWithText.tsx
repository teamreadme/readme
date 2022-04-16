import { BookOpenIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React from "react";
import Logo from "./Logo";

interface LogoWithTextProps {
  className?: string;
  noLogoMargin?: boolean;
}

export default function LogoWithText(props: LogoWithTextProps) {
  return (
    <h1 className="flex items-center justify-center">
      <Logo className={classNames("h-10", { "ml-[-2.5rem]": !props.noLogoMargin })} />
      <span className="block text-3xl ml-2 leading-none text-center font-extrabold tracking-tight text-gray-900 sm:text-4xl">README</span>
    </h1>
  );
}
