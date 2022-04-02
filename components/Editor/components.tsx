//Taken from https://github.com/ianstormtaylor/slate/blob/main/site/examples/richtext.tsx
import { classNames } from "@/utils/formatter";
import React, { Ref, PropsWithChildren } from "react";
import ReactDOM from "react-dom";

interface BaseProps {
  className: string;
  [key: string]: unknown;
}
type OrNull<T> = T | null;

export const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed: boolean;
      } & BaseProps
    >,
    ref: Ref<HTMLSpanElement>
  ) => (
    <span
      {...props}
      ref={ref}
      className={classNames(className, "cursor-pointer", {
        white: reversed && active,
        "#aaa": reversed && !active,
        "text-[black]": !reversed && active,
        "text-gray-400": !reversed && !active,
      })}/>
  )
);
Button.displayName="EditorButton";

export const EditorValue = React.forwardRef(
  (
    {
      className,
      value,
      ...props
    }: PropsWithChildren<
      {
        value: any;
      } & BaseProps
    >,
    ref: Ref<HTMLDivElement>
  ) => {
    const textLines = value.document.nodes
      .map((node: any) => node.text)
      .toArray()
      .join("\n");
    return (
      <div ref={ref} {...props} className={classNames(className, "m-[30px -20px 0]")}>
        <div className={classNames("text-md p-[5px 20px] text-[#404040] border-t-[2px solid #eeeeee] bg-[#f8f8f8]")}></div>
        <div className={classNames("text-[#404040] font-mono text-sm whitespace-pre-wrap p-[10px 20px]")}>{textLines}</div>
      </div>
    );
  }
);
EditorValue.displayName="EditorValue";

export const Icon = React.forwardRef(({ className, ...props }: PropsWithChildren<BaseProps>, ref: Ref<HTMLSpanElement>) => (
  <span {...props} ref={ref} className={classNames('material-icons', className, "text-lg align-bottom")} />
));
Icon.displayName="EditorIcon";

export const Instruction = React.forwardRef(({ className, ...props }: PropsWithChildren<BaseProps>, ref: Ref<HTMLDivElement>) => (
  <div {...props} ref={ref} className={classNames(className, "whitespace-pre-wrap m-[0 -20px 10px] p-[10px 20px] text-sm bg-[#f8f8f8]")} />
));
Instruction.displayName="EditorInstruction";

export const Menu = React.forwardRef(({ className, ...props }: PropsWithChildren<BaseProps>, ref: Ref<HTMLDivElement>) => (
  <div {...props} ref={ref} className={classNames(className, "inline-block space-x-2")} />
));
Menu.displayName="EditorMenu";

export const Portal = ({ children }: any) => {
  return typeof document === "object" ? ReactDOM.createPortal(children, document.body) : null;
};
Portal.displayName="EditorPortal";

export const Toolbar = React.forwardRef(({ className, ...props }: PropsWithChildren<BaseProps>, ref: Ref<HTMLDivElement>) => (
  <Menu {...props} ref={ref} className={classNames(className, "relative, p-[1px 18px 17px] m-[0 -20px] b-bottom-[2px solid #eee]")} />
));
Toolbar.displayName="EditorToolbar";