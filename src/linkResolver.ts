import { FilledContentRelationshipField } from "@prismicio/client";

/**
 * Characters that separate a UID from its tag. Tagging a UID allows for using a path segment more than once. The tag does not appear in the URL.
 *
 * For example, a UID of "my-tag__my-uid" will be converted into "my-uid".
 */
const TAG_SEPARATOR = "__";

export function linkResolver(link: FilledContentRelationshipField) {
  return link.url
    ?.split("/")
    .map((part) => part.replace(new RegExp(`.*${TAG_SEPARATOR}`, "g"), ""))
    .join("/");
}
