import classNames from "classnames";
import { Node } from "slate";

export { classNames };

export const slateToText = (nodes: Node[]) => {
  return nodes.map((n) => Node.string(n)).join("\n");
};
