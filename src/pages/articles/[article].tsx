import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useMemo } from "react";
import { Article as ArticleSchema } from "schema-dts";
import { Meta } from "src/components/Meta";
import { PostBody } from "src/components/PostBody";
import articles from "src/data/articles.json";
import getDocument from "src/lib/getDocument";

import { i18n } from "@/next-i18next.config";

export type AlbumName = keyof typeof articles;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: string[] = [];

  for (const [key] of Object.entries(articles)) {
    paths.push(`/articles/${key}`);
    for (const locale of i18n?.locales || []) {
      paths.push(`/${locale}/articles/${key}`);
    }
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{}, { article: string }> = async (
  ctx,
) => {
  const article = ctx.params?.article;
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "en", [
        "meta",
        "articles",
        "albums",
      ])),
      content: article ? await getDocument(article, ctx.locale) : "",
    },
  };
};

interface ArticleProps {
  _?: void;
  content: string;
}

export const Article: React.FC<ArticleProps> = (props) => {
  const { t } = useTranslation("articles");
  const router = useRouter();
  const article = (router.query.article || "").toString() as AlbumName;
  const meta = useMemo(() => {
    return articles[article];
  }, [article]);

  const title = useMemo(() => {
    if (meta.noTitle) {
      return null;
    }

    return <h2 className="text-red">{t(`${article}`)}</h2>;
  }, [t, meta, article]);

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
      {title}
      <PostBody content={props.content}></PostBody>
    </div>
  );
};

export default Article;
