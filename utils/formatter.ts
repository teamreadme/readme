import classNames from "classnames";
import { Node } from "slate";

export { classNames };

export const slateToText = (nodes: Node[]) => {
  return nodes.map((n) => Node.string(n)).join("n");
};

export const hashString = (data: string) => {
  var hash = 0,
    i,
    chr;
  if (data.length === 0) return hash;
  for (i = 0; i < data.length; i++) {
    chr = data.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export const EMPTY_EDITOR = JSON.stringify([{ type: "paragraph", children: [{ text: "" }] }]);
