import { NextApiRequest } from "next";
import type { DefaultUser, Session } from "next-auth";
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

declare module "next-auth" {
  interface Session {
    user: DefaultUser & {
      id: string;
    };
  }
}

declare module "next/types" {
  interface NextAuthenticatedApiRequest extends NextApiRequest {
    session: Session;
  }
}

type CustomElement = { type: "paragraph" | "block-quote"; align?: string; children: CustomText[] };
type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  "heading-one"?: boolean;
  "heading-two"?: boolean;
  "block-quote"?: boolean;
  "numbered-list"?: boolean;
  "bulleted-list"?: boolean;
  left?: boolean;
  center?: boolean;
  right?: boolean;
  justify?: boolean;
};
type SlateFormat =
  | "bold"
  | "italic"
  | "underline"
  | "code"
  | "heading-one"
  | "heading-two"
  | "block-quote"
  | "numbered-list"
  | "bulleted-list"
  | "left"
  | "center"
  | "right"
  | "justify"
  | "block-quote";


declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
