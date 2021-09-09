import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useMemo } from "react";
import styled from "styled-components";

import { CenterView } from "../../components/CenterView";
import { Meta } from "../../components/Meta";
import { PostBody } from "../../components/PostBody";
import articles from "../../data/articles.json";
import getDocument from "../../lib/getDocument";

type AlbumName = keyof typeof articles;

export const getServerSideProps: GetStaticProps = async (ctx) => {
  // @ts-expect-error
  const { article } = ctx.query;
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "en", [
        "meta",
        "articles",
      ])),
      content: await getDocument(article, ctx.locale),
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
  const title = useMemo(() => {
    const meta = articles[article];
    if (meta.noTitle) {
      return null;
    }

    return <RedTitle>{t(`${article}`)}</RedTitle>;
  }, [t, article]);

  return (
    <CenterView text>
      <Meta />
      {title}
      <PostBody content={props.content}></PostBody>
    </CenterView>
  );
};

const RedTitle = styled.h2`
  color: rgb(203, 73, 73);
`;

export default Article;
