import { ReadMe } from "@prisma/client";
import classNames from "classnames";
import React from "react";
import { Descendant } from "slate";
import { EDITOR_ID } from "./Editor/Editor";

interface TableOfContentsProps {
  readMe: ReadMe;
}

export default function TableOfContents(props: TableOfContentsProps) {

  /**
   * Scroll the clicked header into view. I've yet to find a better way of doing this
   * @param title 
   * @param type 
   * @returns 
   */
  function onClick(title: string, type: "heading-one" | "heading-two") {
    let elements = document.getElementById(EDITOR_ID)?.getElementsByTagName(type == "heading-one" ? "h1" : "h2");
    if (!elements) return;
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].innerText == title) {
        elements[i].scrollIntoView({ behavior: "smooth" });
        break;
      }
    }
  }

  function getTableOfContents() {
    let data: Descendant[] = JSON.parse(props.readMe?.text ?? "[]");
    if (!data) return <div>None</div>;
    return data.map((item: any, index: number) => {
      if (item.type.startsWith("heading")) {
        return (
          <div key={`heading-${index}`} className={classNames("hover:underline cursor-pointer", { "ml-4": item.type == "heading-two" })}>
            <a onClick={() => onClick(item.children[0].text, item.type)}>{item.children[0].text}</a>
          </div>
        );
      }
    });
  }

  return (
    <div>
      <h2 className="font-bold text-2l">Table of Contents</h2>
      {getTableOfContents()}
    </div>
  );
}
