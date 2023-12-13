import fs from "node:fs/promises";
import path from "node:path";

import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";
import { Article as ArticleSchema } from "schema-dts";
import { Meta } from "src/components/Meta";
import { PostBody } from "src/components/PostBody";
import articles from "src/data/articles.json";

type Props = {
  params: { article: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { article } = params;

  const name = article?.toString();
  const t = await getTranslations();

  return { title: t(`articles.${name}`), description: t(`${name}`) };
}

interface ArticleProps {
  params: { article: string; locale: string };
}

const Article: React.FC<ArticleProps> = async ({ params }) => {
  const { locale, article } = params || {};
  const t = await getTranslations("articles");

  const name = (article || "").toString();
  // @ts-expect-error
  const meta = articles[name];

  const filePath = path.resolve(
    `${process.cwd()}/public/locales/${locale}/docs/${name}.html`,
  );
  const content = await fs.readFile(filePath, "utf-8");

  const schema: ArticleSchema = {
    "@type": "NewsArticle",
    datePublished: `${meta.year}`,
  };

  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col justify-start">
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

export default Article;
