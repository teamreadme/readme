import classNames from "classnames";
import { Descendant, Node } from "slate";
import he from 'he';

export { classNames };

export const slateToText = (nodes: Node[]) => {
  return nodes?.map((n) => Node.string(n)).join("\n");
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

/**
 * Get a user's full name or username
 * @param user
 * @returns 
 */
export const userToName = (user: { firstName?: string | null, lastName?: string | null, username: string }) => {
  if (user.firstName) {
    return `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`
  }
  return user.username;
}


/**
 * Remove any HTML elements from the string and applies some addition formatting
 * Meant for display plain text versions of READMEs
 * @param text 
 * @returns 
 */
export const stripHtml = (text?: string | null) => {
  let strippedHtml = text?.replace('</h1>', '. ').replace('</h2>', '. ').replace(/<\/?[^>]+(>|$)/g, "") ?? '';
  
  //Decode HTML entities, i.e. &nbsp;
  return he.decode(strippedHtml);
}