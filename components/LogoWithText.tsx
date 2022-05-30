import { BookOpenIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React from "react";
import Logo from "./Logo";

interface LogoWithTextProps {
  /**
   * Class name of the text color, e.g. `text-white`
   */
  color?: string;
  className?: string;
  extraText?: string;
  noLogoMargin?: boolean;
}

export default function LogoWithText(props: LogoWithTextProps) {
  return (
    <h1 className={classNames("flex items-center justify-center", props.className)}>
      <Logo className={classNames("h-10", { "ml-[-2.5rem]": !props.noLogoMargin }, props.color)} />
      <span className={classNames("block text-3xl ml-2 leading-none text-center font-extrabold tracking-tight text-gray-900 sm:text-4xl", props.color)}>README{props.extraText ? ` ${props.extraText}` : ''}</span>
    </h1 >
  );
}
