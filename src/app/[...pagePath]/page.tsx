import { Metadata } from "next";
import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export const dynamicParams = false;

type Params = { pagePath: string[] };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { pagePath } = await params;
  const uid = pagePath.at(-1);
  if (!uid) notFound();

  const client = createClient();
  const page = await client.getByUID("page", uid).catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { pagePath } = await params;
  const uid = pagePath.at(-1);
  if (!uid) notFound();

  const client = createClient();
  const page = await client.getByUID("page", uid).catch(() => notFound());

  return {
    title: prismic.asText(page.data.title),
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("page");

  return pages.map((page) => {
    return { pagePath: page.url?.split("/").slice(1) };
  });
}
