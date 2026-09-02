import fs from "node:fs/promises";
import path from "node:path";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import React from "react";
import { NewsArticle } from "schema-dts";
import { PostBody } from "src/components/PostBody";
import texts from "src/data/texts.json";

export function generateStaticParams() {
  return Object.keys(texts).map((textId) => ({ textId }));
}

export async function generateMetadata(
  props: PageProps<"/[locale]/texts/[textId]">,
): Promise<Metadata> {
  const params = await props.params;
  const { locale, textId } = params;
  setRequestLocale(locale);

  const name = textId?.toString();
  const t = await getTranslations();

  return { title: t(`texts.${name}`), description: t(`${name}`) };
}

const Text = async (props: PageProps<"/[locale]/texts/[textId]">) => {
  const params = await props.params;
  const { locale, textId } = params || {};
  setRequestLocale(locale);

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
    <div className="w-full max-w-[800px] mx-auto flex flex-col justify-start max-md:px-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      ></script>
      {meta.noTitle ? null : (
        <h1 className="m-0 max-w-[537px] pb-8 text-2xl leading-tight font-normal text-red">
          {t(`${name}`)}
        </h1>
      )}
      <div className="w-full max-w-[537px]">
        <PostBody content={content} />
      </div>
    </div>
  );
};

export default Text;
