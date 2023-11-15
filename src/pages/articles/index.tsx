import { GetStaticProps } from "next";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { Meta } from "src/components/Meta";
import articles from "src/data/articles.json";

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "en", [
        "meta",
        "albums",
        "articles",
        "articles-desc",
      ])),
    },
  };
};

interface ArticlesProps {
  _?: void;
  contents: Record<string, string>;
}

export const Articles: React.FC<ArticlesProps> = () => {
  const { t } = useTranslation("articles");

  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col justify-start">
      <Meta />

      <div className="m-auto pb-28 max-w-2xl">
        {Object.entries(articles).map(([key, value]) => {
          const title = t(key);
          if (title === key) {
            return null;
          }
          return (
            <Link href={`/articles/${key}`} key={key} passHref>
              <h4 className="text-red font-medium">{t(key)}</h4>
              <p className="text-sm">
                {t(`${value.author}`)} / {value.year || 0}
              </p>
              <p className="text-xs">{t(`articles-desc:${key}`)}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Articles;
