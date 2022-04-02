// Inspired by https://github.com/ianstormtaylor/slate/blob/main/site/examples/richtext.tsx
import { CustomElement, CustomText, SlateFormat } from "@/types";
import classNames from "classnames";
import isHotkey from "is-hotkey";
import {
  PersonIcon,
  BoldIcon,
  ItalicIcon,
  ListOrderedIcon,
  ListUnorderedIcon,
  HeadingIcon,
  NoteIcon,
  CodeIcon,
  QuoteIcon,
  ThreeBarsIcon,
  IconProps,
  FilterIcon,
} from "@primer/octicons-react";
import Head from "next/head";
import Link from "next/link";
import { default as React, useState, useRef, useEffect, useCallback } from "react";
import { createEditor, Descendant, Editor, Transforms, Element as SlateElement, NodeMatch, Node } from "slate";
import { Slate, Editable, withReact, ReactEditor, useSlate } from "slate-react";
import { Button, Toolbar } from "./components";
import { UnderlineIcon } from "./icons";
import { prependOnceListener } from "process";

interface EditorProps {
  initialData?: string | null;
  onChange?: (text: string) => void;
  readOnly?: boolean;
  className?: string;
}

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

export default function EditorComponent(props: EditorProps) {
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState<Descendant[]>(
    props.initialData
      ? JSON.parse(props.initialData)
      : [
          {
            type: "paragraph",
            children: [{ text: "" }],
          },
        ]
  );
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  function save(value: Descendant[]) {
    if (!props.readOnly) {
      props.onChange?.(JSON.stringify(value));
      setValue(value);
    }
  }

  return (
    <div className={classNames("min-h-[500px] bg-white rounded-md mt-2", props.className)}>
      <Slate editor={editor} value={value} onChange={save}>
        {!props.readOnly && (
          <Toolbar className="border-b-2 border-gray-200 w-full p-4 flex">
            <div className="flex-1 items-center flex space-x-2">
              <MarkButton format="bold" Icon={BoldIcon} />
              <MarkButton format="italic" Icon={ItalicIcon} />
              <MarkButton format="underline" Icon={UnderlineIcon} />
              <MarkButton format="code" Icon={CodeIcon} />
              <BlockButton format="heading-one" Icon={HeadingIcon} />
              <BlockButton format="heading-two" iconClassName="h-[14px]" Icon={HeadingIcon} />
              <BlockButton format="block-quote" Icon={QuoteIcon} />
              <BlockButton format="numbered-list" Icon={ListOrderedIcon} />
              <BlockButton format="bulleted-list" Icon={ListUnorderedIcon} />
              <BlockButton format="left" iconClassName="rotate-[270deg]" Icon={FilterIcon} />
              <BlockButton format="center" iconClassName="" Icon={FilterIcon} />
              <BlockButton format="right" iconClassName="rotate-[90deg]" Icon={FilterIcon} />
              <BlockButton format="justify" Icon={ThreeBarsIcon} />
            </div>
            <div className="hidden sm:block">
              <Link href="/profile" passHref>
                <a title="Edit profile">
                  <PersonIcon size="medium" className="cursor-pointer h-[20px]" />
                </a>
              </Link>
            </div>
          </Toolbar>
        )}
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          readOnly={props.readOnly}
          placeholder="Introduce yourself..."
          className={classNames("p-4 min-h-[500px]", { "h-[500px] overflow-auto": !props.readOnly })}
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault();
                const mark = (HOTKEYS as any)[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </div>
  );
}

const toggleBlock = (editor: ReactEditor, format: any) => {
  const isActive = isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? "align" : "type");
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes(n.type) && !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format) && !isActive) {
    newProperties = {
      align: format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block: CustomElement = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor: ReactEditor, format: any) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor: ReactEditor, format: any, blockType: "align" | "type" = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n: any) => !Editor.isEditor(n) && SlateElement.isElement(n) && n[blockType] === format,
    })
  );

  return !!match;
};

const isMarkActive = (editor: ReactEditor, format: SlateFormat) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }: any) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <div className="prose">
          <blockquote className="prose-blockquote" style={style} {...attributes}>
            {children}
          </blockquote>
        </div>
      );
    case "bulleted-list":
      return (
        <ul className="list-disc my-2 pl-8" style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 className="text-xl" style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 className="text-lg" style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol className="list-decimal my-2 pl-8" style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code className="bg-gray-200 p-1">{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({
  format,
  Icon,
  iconClassName,
  iconSize,
}: {
  format: SlateFormat;
  Icon: React.FC<any>;
  iconClassName?: string;
  iconSize?: "small" | "medium" | "large";
}) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? "align" : "type")}
      onMouseDown={(event: any) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon iconSize={iconSize} className={iconClassName} />
    </Button>
  );
};

const MarkButton = ({ format, Icon, iconClassName }: { format: SlateFormat; Icon: React.FC<any>; iconClassName?: string }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: any) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon className={iconClassName} />
    </Button>
  );
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: "bold", bold: true },
      {
        text: ", or add a semantically rendered block quote in the middle of the page, like this:",
      },
    ],
  },
  {
    type: "block-quote",
    children: [{ text: "A wise quote." }],
  },
  {
    type: "paragraph",
    align: "center",
    children: [{ text: "Try it out for yourself!" }],
  },
];
