import { ReadMe } from "@prisma/client";
import classNames from "classnames";
import React, { useMemo } from "react";

interface TableOfContentsProps {
  readMe: ReadMe;
  onClick?: (title: string) => void;
}

/**
 * Returns true if the provided read me would have a table of contents
 * @param readMeText
 * @returns
 */
export function hasTableOfContents(readMeText?: string | null) {
  return (getTableOfContents(readMeText)?.length ?? 0) > 0;
}

/**
 * Generates a table of contents based on headings
 * @param readMeText
 * @returns
 */
function getTableOfContents(readMeText: string | null | undefined, onClick?: (content: string) => void) {
  let parser = new DOMParser();
  const doc = parser.parseFromString(readMeText ?? '', 'text/html');
  let headers = doc.querySelectorAll('h1,h2,h3');
  if (!headers?.length) return null;
  let out: any[] = [];
  headers.forEach((item: any, index: number) => {
    out.push(<div key={`heading-${index}`} className={classNames("hover:underline cursor-pointer", { "ml-4": item.tagName == "H2", 'ml-6':item.tagName=="H3" })}>
      <a className="text-gray-700" onClick={() => onClick?.(item.textContent)}>{item.textContent}</a>
    </div>)
  })
  return out
}


export default function TableOfContents(props: TableOfContentsProps) {
  const toc = useMemo(() => getTableOfContents(props.readMe?.text, props.onClick), [props.readMe]);
  if (!toc?.length) return null;
  return (
    <div>
      <div className="font-bold -ml-4 text-2xl">{toc[0]}</div>
      {toc.slice(1)}
    </div>
  );
}
