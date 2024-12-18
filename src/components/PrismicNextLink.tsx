"use client";

import {
  PrismicNextLink as BasePrismicNextLink,
  PrismicNextLinkProps,
} from "@prismicio/next";

import { linkResolver } from "@/linkResolver";

export function PrismicNextLink(props: PrismicNextLinkProps) {
  return <BasePrismicNextLink linkResolver={linkResolver} {...props} />;
}
