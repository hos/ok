import fs from "node:fs/promises";
import path from "node:path";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import React from "react";
import { NewsArticle } from "schema-dts";
import { Meta } from "src/components/Meta";
import { PostBody } from "src/components/PostBody";
import texts from "src/data/texts.json";

export async function generateMetadata(
  props: PageProps<"/[locale]/texts/[textId]">,
): Promise<Metadata> {
  const params = await props.params;
  const { textId } = params;

  const name = textId?.toString();
  const t = await getTranslations();

  return { title: t(`texts.${name}`), description: t(`${name}`) };
}

const Text = async (props: PageProps<"/[locale]/texts/[textId]">) => {
  const params = await props.params;
  const { locale, textId } = params || {};

  const t = await getTranslations("texts");

  const name = (textId || "").toString();
  // @ts-expect-error
  const meta = texts[name];

  const filePath = path.resolve(
    `${process.cwd()}/public/locales/${locale}/docs/${name}.html`,
  );
  const content = await fs.readFile(filePath, "utf-8").catch(() => null);
  if (!content) {
    return notFound();
  }

  const schema: NewsArticle = {
    "@type": "NewsArticle",
    datePublished: `${meta.year}`,
  };

  return (
    <div className="max-w-[600px] mx-auto flex max-md:mx-6 flex-col justify-start">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      ></script>
      <Meta />
      {meta.noTitle ? null : <h2 className="text-red">{t(`${name}`)}</h2>}
      <PostBody content={content}></PostBody>
    </div>
  );
};

export default Text;
