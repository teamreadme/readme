import classNames from "classnames";
import React from "react";

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: (e: any) => void;
  children?: React.ReactChild|React.ReactChild[];
}

export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      type="submit"
      disabled={props.disabled}
      className={classNames(
        "group relative w-full disabled:bg-purple-300 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
        props.className
      )}
    >
      {props.children}
    </button>
  );
}
